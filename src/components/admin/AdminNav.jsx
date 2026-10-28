'use client';

/* =====================================================================
   Shared navigation config + pieces for AdminSidebar and AdminTopbar.
   Place at: components/admin/AdminNav.jsx
   ===================================================================== */

import Link from 'next/link';

/* ---------- icons ---------- */
const Svg = ({ children, className = 'h-[18px] w-[18px]' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {children}
  </svg>
);

export const navIcons = {
  dashboard: (
    <Svg>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </Svg>
  ),
  quotes: (
    <Svg>
      <path d="M7 3h7l5 5v13H7z" />
      <path d="M14 3v5h5M10 13h6M10 17h4" />
    </Svg>
  ),
  enquiries: (
    <Svg>
      <path d="M4 5h16v11H9l-5 4z" />
      <path d="M8 9h8M8 12h5" />
    </Svg>
  ),
  services: (
    <Svg>
      <path d="M3 17h13l3-5h2M3 17V8h9v9" />
      <circle cx="6.5" cy="19.5" r="1.5" />
      <circle cx="15.5" cy="19.5" r="1.5" />
    </Svg>
  ),
  industries: (
    <Svg>
      <path d="M3 21V10l6 3V9l6 3V5h6v16zM3 21h18" />
    </Svg>
  ),
  caseStudies: (
    <Svg>
      <path d="M4 6a2 2 0 0 1 2-2h9l5 5v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
      <path d="M8 13l2.5 2.5L16 10" />
    </Svg>
  ),
  insights: (
    <Svg>
      <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" />
    </Svg>
  ),
  jobs: (
    <Svg>
      <path d="M4 8h16v11H4zM9 8V5h6v3M4 13h16" />
    </Svg>
  ),
  users: (
    <Svg>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5a6.5 6.5 0 0 1 3.5 5.5" />
    </Svg>
  ),
  account: (
    <Svg>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </Svg>
  ),
  external: (
    <Svg className="h-4 w-4">
      <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </Svg>
  ),
  logout: (
    <Svg className="h-4 w-4">
      <path d="M9 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4M16 8l4 4-4 4M20 12H9" />
    </Svg>
  ),
  menu: (
    <Svg className="h-5 w-5">
      <path d="M4 7h16M4 12h16M4 17h10" />
    </Svg>
  ),
  close: (
    <Svg className="h-5 w-5">
      <path d="M6 6l12 12M18 6L6 18" />
    </Svg>
  ),
  chevronDown: (
    <Svg className="h-4 w-4">
      <path d="M6 9l6 6 6-6" />
    </Svg>
  ),
  chevronRight: (
    <Svg className="h-3.5 w-3.5">
      <path d="M9 6l6 6-6 6" />
    </Svg>
  ),
};

/* ---------- nav config (single source of truth) ---------- */
export const NAV = [
  {
    section: 'Overview',
    items: [{ label: 'Dashboard', href: '/admin', icon: navIcons.dashboard }],
  },
  {
    section: 'Inbox',
    items: [
      { label: 'Quote Requests', href: '/admin/quotes', icon: navIcons.quotes },
      { label: 'Enquiries', href: '/admin/enquiries', icon: navIcons.enquiries },
    ],
  },
  {
    section: 'Content',
    items: [
      { label: 'Services', href: '/admin/services', icon: navIcons.services },
      { label: 'Industries', href: '/admin/industries', icon: navIcons.industries },
      // { label: 'Case Studies', href: '/admin/case-studies', icon: navIcons.caseStudies },
      // { label: 'Insights', href: '/admin/insights', icon: navIcons.insights },
      // { label: 'Careers / Jobs', href: '/admin/jobs', icon: navIcons.jobs },
    ],
  },
  {
    section: 'Settings',
    items: [
      // adminOnly items are hidden for editor / viewer roles.
      { label: 'Users & Roles', href: '/admin/users', icon: navIcons.users, adminOnly: true },
      { label: 'My Account', href: '/admin/account', icon: navIcons.account },
    ],
  },
];

/** Dashboard only matches exactly; every other item also matches its sub-pages. */
export const isActive = (pathname, href) =>
  href === '/admin' ? pathname === '/admin' : pathname === href || pathname.startsWith(`${href}/`);

/** Finds the section + item for the current path (longest href wins). */
export function findCurrent(pathname) {
  let best = null;
  for (const group of NAV) {
    for (const item of group.items) {
      if (isActive(pathname, item.href) && (!best || item.href.length > best.item.href.length)) {
        best = { section: group.section, item };
      }
    }
  }
  return best;
}

/* ---------- shared pieces ---------- */
export function BrandMark() {
  return (
    <Link
      href="/admin"
      className="focus-ring flex items-center gap-3 rounded-lg"
      aria-label="Crystal Admin dashboard"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-crimson text-[11px] font-extrabold tracking-wide text-white shadow-lg shadow-crimson/30">
        EL
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-extrabold tracking-tight text-white">Crystal Admin</span>
        <span className="block text-[11px] font-medium text-white/45">Control panel</span>
      </span>
    </Link>
  );
}

export function UserAvatar({ name, className = 'h-9 w-9 text-xs' }) {
  const initials = (name || '?')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-crimson to-crimson-700 font-bold text-white ${className}`}
    >
      {initials || '?'}
    </span>
  );
}

/** Dark-surface nav list, used by the desktop sidebar and the mobile drawer. */
export function NavList({ user, pathname, onNavigate }) {
  const isAdmin = user?.role === 'admin';

  return (
    <nav aria-label="Admin" className="space-y-7">
      {NAV.map((group) => {
        const items = group.items.filter((item) => !item.adminOnly || isAdmin);
        if (items.length === 0) return null;
        return (
          <div key={group.section}>
            <p className="px-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white/35">
              {group.section}
            </p>
            <ul className="mt-2 space-y-1">
              {items.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      aria-current={active ? 'page' : undefined}
                      className={`focus-ring group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                        active
                          ? 'bg-white/10 text-white'
                          : 'text-white/65 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {active && (
                        <span
                          aria-hidden="true"
                          className="absolute -left-4 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-crimson"
                        />
                      )}
                      <span
                        className={`transition-colors ${
                          active ? 'text-white' : 'text-white/45 group-hover:text-white/80'
                        }`}
                      >
                        {item.icon}
                      </span>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}

/** Footer block: live-site link + signed-in user card. */
export function SidebarFooter({ user, onNavigate }) {
  return (
    <div className="space-y-3 border-t border-white/10 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <Link
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
        className="focus-ring flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-white/65 transition-colors hover:bg-white/5 hover:text-white"
      >
        View live website
        {navIcons.external}
      </Link>

      {user && (
        <Link
          href="/admin/account"
          onClick={onNavigate}
          className="focus-ring flex items-center gap-3 rounded-xl bg-white/5 p-3 transition-colors hover:bg-white/10"
          title="My account"
        >
          <UserAvatar name={user.name} />
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-sm font-semibold text-white">{user.name}</span>
            <span className="block text-xs capitalize text-white/45">{user.role}</span>
          </span>
        </Link>
      )}
    </div>
  );
}