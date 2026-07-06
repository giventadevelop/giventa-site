import type { TenantEmailAddressDTO } from '@/types';

/** Email type for public contact forms (matches admin tenant-email-addresses). */
export const CONTACT_FORM_EMAIL_TYPE: TenantEmailAddressDTO['emailType'] = 'CONTACT';

export interface ContactFormSubmitPayload {
  firstName: string;
  lastName: string;
  messageBody: string;
  senderEmail: string;
  emailType: TenantEmailAddressDTO['emailType'];
}

export function buildContactFormPayload(input: {
  firstName: string;
  lastName: string;
  messageBody: string;
  senderEmail: string;
  emailType?: TenantEmailAddressDTO['emailType'];
}): ContactFormSubmitPayload {
  return {
    firstName: input.firstName,
    lastName: input.lastName,
    messageBody: input.messageBody,
    senderEmail: input.senderEmail.trim(),
    emailType: input.emailType ?? CONTACT_FORM_EMAIL_TYPE,
  };
}

export function splitFullName(fullName: string): { firstName: string; lastName: string } {
  const trimmed = fullName.trim();
  const [firstName, ...rest] = trimmed.split(/\s+/);
  return {
    firstName: firstName || 'Guest',
    lastName: rest.join(' ').trim() || 'N/A',
  };
}

export function appendFormExtras(
  message: string,
  extras: { phone?: string; website?: string; department?: string }
): string {
  let body = message.trim();
  const lines: string[] = [];
  if (extras.phone?.trim()) lines.push(`Phone: ${extras.phone.trim()}`);
  if (extras.website?.trim()) lines.push(`Website: ${extras.website.trim()}`);
  if (extras.department?.trim()) lines.push(`Department: ${extras.department.trim()}`);
  if (lines.length > 0) {
    body = body ? `${body}\n\n${lines.join('\n')}` : lines.join('\n');
  }
  return body;
}

export type ContactFormSubmitResult = {
  ok: boolean;
  message: string;
};

/**
 * POST public contact/appointment inquiry to the backend via Next.js proxy.
 * Proxy forwards to `/api/contact-form-email/send` and injects tenantId.
 */
export async function submitContactForm(
  payload: ContactFormSubmitPayload
): Promise<ContactFormSubmitResult> {
  const response = await fetch('/api/proxy/contact-form-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({} as Record<string, unknown>));

  if (response.ok && data?.success !== false) {
    return {
      ok: true,
      message:
        (typeof data?.message === 'string' && data.message) ||
        'Thank you! Your message has been sent.',
    };
  }

  return {
    ok: false,
    message:
      (typeof data?.error === 'string' && data.error) ||
      (typeof data?.message === 'string' && data.message) ||
      'Failed to send message. Please try again or email us directly.',
  };
}
