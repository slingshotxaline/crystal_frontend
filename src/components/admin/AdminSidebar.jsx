'use client';

import { usePathname } from 'next/navigation';
import { BrandMark, NavList, SidebarFooter } from '@/components/admin/AdminNav';

export default function AdminSidebar({ user }) {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 bg-navy-900 text-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col">
      <div className="flex h-16 shrink-0 items-center border-b border-white/10 px-6">
        <BrandMark />
      </div>

      {/* Scrolls on short screens; footer stays pinned */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <NavList user={user} pathname={pathname} />
      </div>

      <SidebarFooter user={user} />
    </aside>
  );
}