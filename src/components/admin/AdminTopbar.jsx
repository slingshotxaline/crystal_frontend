"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/lib/auth";
import {
  BrandMark,
  NavList,
  SidebarFooter,
  UserAvatar,
  findCurrent,
  navIcons,
} from "@/components/admin/AdminNav";

export default function AdminTopbar({ user }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const current = findCurrent(pathname);

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    router.push("/admin/login");
  };

  // Close everything on route change.
  useEffect(() => {
    setMobileOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  // Escape closes the drawer / dropdown.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Click outside closes the user dropdown.
  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [menuOpen]);

  // Lock page scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 w-full min-w-0 items-center justify-between gap-3 border-b border-navy-100 bg-white/85 px-4 backdrop-blur-md sm:px-6">
        {/* Left: hamburger + breadcrumb */}
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="focus-ring -ml-1 rounded-lg p-2 text-navy-900 transition-colors hover:bg-navy-100/60 lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open admin menu"
            aria-expanded={mobileOpen}
          >
            {navIcons.menu}
          </button>

          <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-2 text-sm">
            <span className="hidden font-medium text-navy-400 sm:inline">
              {current?.section ?? "Admin"}
            </span>
            {current && (
              <>
                <span className="hidden text-navy-300 sm:inline">{navIcons.chevronRight}</span>
                <span className="truncate font-semibold text-navy-900">{current.item.label}</span>
              </>
            )}
          </nav>
        </div>

        {/* Right: site link + user menu */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring hidden items-center gap-2 rounded-full border border-navy-100 px-3.5 py-1.5 text-xs font-semibold text-navy-700 transition hover:border-navy-400 sm:inline-flex"
          >
            View site {navIcons.external}
          </Link>

          <div className="relative" ref={menuRef}>
            {user ? (
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                className="focus-ring flex items-center gap-2.5 rounded-full border border-transparent py-1 pl-1 pr-2.5 transition-colors hover:border-navy-100 hover:bg-navy-100/40 sm:pr-3"
              >
                <UserAvatar name={user.name} className="h-8 w-8 text-[11px]" />
                <span className="hidden text-left leading-tight sm:block">
                  <span className="block text-sm font-semibold text-navy-900">{user.name}</span>
                  <span className="block text-[11px] capitalize text-navy-400">{user.role}</span>
                </span>
                <span
                  className={`text-navy-400 transition-transform ${menuOpen ? "rotate-180" : ""}`}
                >
                  {navIcons.chevronDown}
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleLogout}
                className="focus-ring rounded-full border border-navy-100 px-4 py-1.5 text-xs font-semibold text-navy-700 hover:border-crimson hover:text-crimson"
              >
                Log out
              </button>
            )}

            {menuOpen && user && (
              <div
                role="menu"
                className="absolute right-0 top-full mt-2 w-64 max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-navy-100 bg-white p-1.5 shadow-xl"
              >
                <div className="flex items-center gap-3 rounded-xl bg-navy-100/40 p-3">
                  <UserAvatar name={user.name} />
                  <div className="min-w-0 leading-tight">
                    <p className="truncate text-sm font-semibold text-navy-900">{user.name}</p>
                    <p className="truncate text-xs capitalize text-navy-400">{user.role}</p>
                  </div>
                </div>

                <Link
                  href="/admin/account"
                  role="menuitem"
                  className="focus-ring mt-1.5 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-navy-800 transition-colors hover:bg-navy-100/50"
                >
                  <span className="text-navy-400">{navIcons.account}</span>
                  My account
                </Link>
                <button
                  type="button"
                  role="menuitem"
                  onClick={handleLogout}
                  className="focus-ring flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-crimson transition-colors hover:bg-crimson/5"
                >
                  <span className="flex h-[18px] w-[18px] items-center justify-center">
                    {navIcons.logout}
                  </span>
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile drawer. Rendered outside <header> so backdrop-blur can't trap its fixed positioning. */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          mobileOpen ? "visible" : "invisible transition-[visibility] duration-0 delay-300"
        }`}
        aria-hidden={!mobileOpen}
      >
        <button
          type="button"
          tabIndex={mobileOpen ? 0 : -1}
          aria-label="Close admin menu"
          onClick={() => setMobileOpen(false)}
          className={`absolute inset-0 bg-navy-900/60 backdrop-blur-sm transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Admin menu"
          className={`absolute inset-y-0 left-0 flex w-72 max-w-[85%] flex-col bg-navy-900 text-white shadow-2xl transition-transform duration-300 ease-out ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 pl-6 pr-3">
            <BrandMark />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close admin menu"
              className="focus-ring rounded-lg p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              {navIcons.close}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-6">
            <NavList user={user} pathname={pathname} onNavigate={() => setMobileOpen(false)} />
          </div>

          <SidebarFooter user={user} onNavigate={() => setMobileOpen(false)} />
        </aside>
      </div>
    </>
  );
}