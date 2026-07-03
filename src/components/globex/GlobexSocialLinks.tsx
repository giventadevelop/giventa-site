type GlobexSocialLinksProps = {
  variant?: 'header' | 'footer' | 'sidebar';
};

const SOCIAL_BY_VARIANT = {
  header: [
    { href: '#', label: 'Facebook', className: 'fa fa-facebook-f' },
    { href: '#', label: 'X', className: 'globex-social-x' },
    { href: '#', label: 'Dribbble', className: 'fa fa-dribbble' },
    { href: '#', label: 'Google', className: 'fa fa-google' },
  ],
  footer: [
    { href: '#', label: 'Facebook', className: 'fa fa-facebook-f' },
    { href: '#', label: 'LinkedIn', className: 'fa fa-linkedin' },
    { href: '#', label: 'X', className: 'globex-social-x' },
    { href: '#', label: 'Google', className: 'fa fa-google' },
  ],
  sidebar: [
    { href: '#', label: 'Facebook', className: 'fa fa-facebook-f' },
    { href: '#', label: 'X', className: 'globex-social-x' },
    { href: '#', label: 'LinkedIn', className: 'fa fa-linkedin' },
    { href: '#', label: 'Instagram', className: 'fa fa-instagram' },
  ],
} as const;

function SocialAnchor({ href, label, className }: { href: string; label: string; className: string }) {
  return (
    <a href={href} className={className} aria-label={label}>
      {className === 'globex-social-x' ? <span aria-hidden="true">X</span> : null}
    </a>
  );
}

export default function GlobexSocialLinks({ variant = 'header' }: GlobexSocialLinksProps) {
  const items = SOCIAL_BY_VARIANT[variant];

  if (variant === 'sidebar') {
    return (
      <ul className="social-box">
        {items.map(({ href, label, className }) => (
          <li key={label} className={label.toLowerCase()}>
            <SocialAnchor href={href} label={label} className={className} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="social-box">
      {items.map(({ href, label, className }) => (
        <li key={label}>
          <SocialAnchor href={href} label={label} className={className} />
        </li>
      ))}
    </ul>
  );
}
