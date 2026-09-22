'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTopbar from '@/components/admin/AdminTopbar';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/admin/login';

  const [status, setStatus] = useState('checking'); // checking | ok | denied
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isLoginPage) return;
    let active = true;

    getCurrentUser().then((currentUser) => {
      if (!active) return;
      if (!currentUser) {
        setStatus('denied');
        router.replace('/admin/login');
      } else {
        setUser(currentUser);
        setStatus('ok');
      }
    });

    return () => {
      active = false;
    };
  }, [isLoginPage, router]);

  // The login page renders on its own, with no sidebar/shell.
  if (isLoginPage) return children;

  if (status === 'checking') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream-100 text-navy-400">
        Checking your session…
      </div>
    );
  }

  if (status === 'denied') {
    return null; // redirect is already underway
  }

  return (
    <div className="flex min-h-screen bg-cream-100">
      <AdminSidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <AdminTopbar user={user} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
