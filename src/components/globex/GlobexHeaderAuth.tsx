'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { adminSubmenuItems } from '@/components/header/adminSubmenuItems';
import { useHeaderAuth } from '@/components/header/useHeaderAuth';

type GlobexHeaderAuthProps = {
  layout: 'desktop' | 'mobile' | 'topbar';
  isTenantAdmin?: boolean;
  onCloseMobileMenu?: () => void;
};

function useAdminRedirectPaths() {
  const [paths, setPaths] = useState({ signIn: '/sign-in', signUp: '/sign-up' });

  useEffect(() => {
    const adminUrl = `${window.location.origin}/admin`;
    const redirect = encodeURIComponent(adminUrl);
    setPaths({
      signIn: `/sign-in?redirect_url=${redirect}`,
      signUp: `/sign-up?redirect_url=${redirect}`,
    });
  }, []);

  return paths;
}

function closeGlobexMobileMenu() {
  if (typeof document !== 'undefined') {
    document.body.classList.remove('mobile-menu-visible');
  }
}

function GlobexUserMenu({
  user,
  onSignOut,
  isSigningOut,
  compact,
}: {
  user: ReturnType<typeof useHeaderAuth>['user'];
  onSignOut: () => void;
  isSigningOut: boolean;
  compact?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const userImageUrl = user?.imageUrl || (user?.hasImage ? user?.imageUrl : null);
  const userName =
    user?.firstName || user?.fullName || user?.emailAddresses?.[0]?.emailAddress || 'User';

  return (
    <div className={`globex-user-menu${compact ? ' globex-user-menu--compact' : ''}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="globex-user-menu__trigger"
        aria-label="User menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {userImageUrl ? (
          <Image
            src={userImageUrl}
            alt={userName}
            width={36}
            height={36}
            className="globex-user-menu__avatar"
            unoptimized
          />
        ) : (
          <span className="globex-user-menu__avatar globex-user-menu__avatar--fallback">
            <User size={16} aria-hidden />
          </span>
        )}
      </button>

      {isOpen && (
        <div className="globex-user-menu__panel" role="menu" aria-label="User menu">
          <Link
            href="/profile"
            className={`globex-user-menu__item${pathname === '/profile' ? ' is-active' : ''}`}
            role="menuitem"
            onClick={() => setIsOpen(false)}
          >
            Profile
          </Link>
          <button
            type="button"
            className="globex-user-menu__item globex-user-menu__item--signout"
            role="menuitem"
            disabled={isSigningOut}
            onClick={() => {
              setIsOpen(false);
              onSignOut();
            }}
          >
            {isSigningOut ? 'Signing out…' : 'Sign Out'}
          </button>
        </div>
      )}
    </div>
  );
}

function GlobexAdminDropdown({ pathname, onNavigate }: { pathname: string | null; onNavigate?: () => void }) {
  return (
    <div className="globex-admin-dropdown group">
      <Link
        href="/admin"
        className={`globex-header-auth__admin-link${pathname?.startsWith('/admin') ? ' is-active' : ''}`}
        onClick={onNavigate}
      >
        <span>Admin</span>
        <ChevronDown size={14} aria-hidden />
      </Link>
      <div className="globex-admin-dropdown__panel" role="menu" aria-label="Admin panel">
        <ul>
          {adminSubmenuItems.map((item) => {
            if (item.dropdown?.length) {
              return (
                <li key={item.name} className="globex-admin-dropdown__nested">
                  <span className="globex-admin-dropdown__label">{item.name}</span>
                  <ul>
                    {item.dropdown.map((sub) => (
                      <li key={sub.name}>
                        <Link
                          href={sub.href}
                          className={pathname?.startsWith(sub.href) ? 'is-active' : undefined}
                          onClick={onNavigate}
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            }

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={pathname?.startsWith(item.href) ? 'is-active' : undefined}
                  onClick={onNavigate}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function SignedOutLinks({
  signIn,
  signUp,
  variant,
  onNavigate,
}: {
  signIn: string;
  signUp: string;
  variant: 'desktop' | 'mobile' | 'topbar';
  onNavigate?: () => void;
}) {
  if (variant === 'mobile') {
    return (
      <div className="globex-header-auth globex-header-auth--mobile-signed-out">
        <Link href={signIn} className="globex-header-auth__sign-in" onClick={onNavigate}>
          Sign In
        </Link>
        <Link href={signUp} className="globex-header-auth__sign-up" onClick={onNavigate}>
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className={`globex-header-auth globex-header-auth--${variant}`}>
      <Link href={signIn} className="globex-header-auth__sign-in" onClick={onNavigate}>
        Sign In
      </Link>
      <Link href={signUp} className="globex-header-auth__sign-up" onClick={onNavigate}>
        Sign Up
      </Link>
    </div>
  );
}

function GlobexHeaderAuthClerk({ layout, isTenantAdmin, onCloseMobileMenu }: GlobexHeaderAuthProps) {
  const pathname = usePathname();
  const { signIn, signUp } = useAdminRedirectPaths();
  const { userId, isLoaded, user, isAdmin, isSigningOut, handleSignOut } = useHeaderAuth({
    isTenantAdmin,
    logPrefix: '[GlobexHeaderAuth]',
  });

  const handleMobileNav = () => {
    closeGlobexMobileMenu();
    onCloseMobileMenu?.();
  };

  const showSignedOut = !isLoaded || !userId;

  if (showSignedOut) {
    return (
      <SignedOutLinks
        signIn={signIn}
        signUp={signUp}
        variant={layout}
        onNavigate={layout === 'mobile' ? handleMobileNav : undefined}
      />
    );
  }

  if (layout === 'mobile') {
    return (
      <div className="globex-header-auth globex-header-auth--mobile-signed-in">
        {isAdmin && (
          <>
            <Link href="/admin" className="globex-header-auth__sign-in" onClick={handleMobileNav}>
              Admin
            </Link>
            {adminSubmenuItems.slice(0, 6).map((item) =>
              item.dropdown?.length ? (
                item.dropdown.map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    className="globex-header-auth__admin-sub"
                    onClick={handleMobileNav}
                  >
                    {sub.name}
                  </Link>
                ))
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="globex-header-auth__admin-sub"
                  onClick={handleMobileNav}
                >
                  {item.name}
                </Link>
              )
            )}
          </>
        )}
        <Link href="/profile" className="globex-header-auth__sign-in" onClick={handleMobileNav}>
          Profile
        </Link>
        <button
          type="button"
          className="globex-header-auth__sign-out"
          disabled={isSigningOut}
          onClick={() => {
            handleMobileNav();
            handleSignOut();
          }}
        >
          {isSigningOut ? 'Signing out…' : 'Sign Out'}
        </button>
      </div>
    );
  }

  return (
    <div className={`globex-header-auth globex-header-auth--${layout} globex-header-auth--signed-in`}>
      {isAdmin && <GlobexAdminDropdown pathname={pathname} />}
      <GlobexUserMenu user={user} onSignOut={handleSignOut} isSigningOut={isSigningOut} compact={layout === 'topbar'} />
    </div>
  );
}

function GlobexHeaderAuthStatic({ layout, onCloseMobileMenu }: GlobexHeaderAuthProps) {
  const handleMobileNav = () => {
    closeGlobexMobileMenu();
    onCloseMobileMenu?.();
  };

  return (
    <SignedOutLinks
      signIn="/sign-in"
      signUp="/sign-up"
      variant={layout}
      onNavigate={layout === 'mobile' ? handleMobileNav : undefined}
    />
  );
}

export default function GlobexHeaderAuth(props: GlobexHeaderAuthProps) {
  const hasClerkKey = Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
      process.env.AMPLIFY_NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  );

  if (!hasClerkKey) {
    return <GlobexHeaderAuthStatic {...props} />;
  }

  return <GlobexHeaderAuthClerk {...props} />;
}
