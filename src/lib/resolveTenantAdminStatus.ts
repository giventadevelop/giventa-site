import { fetchWithJwtRetry } from '@/lib/proxyHandler';
import { getApiBaseUrl, getTenantId } from '@/lib/env';
import { isAdminRole } from '@/lib/utils';
import type { UserProfileDTO } from '@/types';

function normalizeProfile(data: unknown): UserProfileDTO | null {
  let profile: UserProfileDTO | null = null;

  if (Array.isArray(data)) {
    profile = (data[0] as UserProfileDTO | undefined) ?? null;
  } else if (
    data &&
    typeof data === 'object' &&
    'content' in data &&
    Array.isArray((data as { content: unknown[] }).content)
  ) {
    profile = ((data as { content: UserProfileDTO[] }).content[0]) ?? null;
  } else if (data && typeof data === 'object' && ('userId' in data || 'id' in data)) {
    profile = data as UserProfileDTO;
  }

  if (!profile) return null;

  const raw = profile as UserProfileDTO & { user_role?: string };
  if (!raw.userRole && raw.user_role) {
    return { ...profile, userRole: raw.user_role };
  }

  return profile;
}

function parseProfileFromListResponse(data: unknown): UserProfileDTO | null {
  return normalizeProfile(data);
}

export async function fetchUserProfileByUserId(
  userId: string
): Promise<UserProfileDTO | null> {
  const tenantId = getTenantId();
  const apiBase = getApiBaseUrl();

  // Criteria query — same path as admin layout (most reliable tenant scoping).
  const params = new URLSearchParams({
    'userId.equals': userId,
    'tenantId.equals': tenantId,
    size: '1',
  });
  const listUrl = `${apiBase}/api/user-profiles?${params.toString()}`;
  const listRes = await fetchWithJwtRetry(listUrl, { cache: 'no-store' });
  if (listRes.ok) {
    const listData = await listRes.json();
    const fromList = normalizeProfile(listData);
    if (fromList) return fromList;
  }

  const byUserUrl = `${apiBase}/api/user-profiles/by-user/${encodeURIComponent(userId)}?tenantId.equals=${encodeURIComponent(tenantId)}`;
  const res = await fetchWithJwtRetry(byUserUrl, { cache: 'no-store' });
  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  return normalizeProfile(data);
}

export async function fetchUserProfileByEmail(
  email: string
): Promise<UserProfileDTO | null> {
  const tenantId = getTenantId();
  const apiBase = getApiBaseUrl();
  const params = new URLSearchParams({
    'email.equals': email,
    'tenantId.equals': tenantId,
    size: '1',
  });
  const url = `${apiBase}/api/user-profiles?${params.toString()}`;

  const res = await fetchWithJwtRetry(url, { cache: 'no-store' });
  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  return parseProfileFromListResponse(data);
}

/**
 * Resolve tenant-scoped admin flag from backend user_profile (userRole ADMIN/SUPER_ADMIN).
 * Tries Clerk userId first, then email fallback (handles userId mismatch after re-login).
 */
export async function resolveIsTenantAdmin(
  userId: string,
  email?: string | null
): Promise<boolean> {
  try {
    let profile = await fetchUserProfileByUserId(userId);

    if (!profile && email?.trim()) {
      profile = await fetchUserProfileByEmail(email.trim());
    }

    return isAdminRole(profile?.userRole);
  } catch (error) {
    console.error('[resolveIsTenantAdmin] Failed to resolve admin status:', error);
    return false;
  }
}
