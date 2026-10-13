"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";

  const [status, setStatus] = useState("checking"); // checking | ok | denied
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isLoginPage) return;
    let active = true;

    getCurrentUser().then((currentUser) => {
      if (!active) return;
      if (!currentUser) {
        setStatus("denied");
        router.replace("/admin/login");
      } else {
        setUser(currentUser);
        setStatus("ok");
      }
    });

    return () => {
      active = false;
    };
  }, [isLoginPage, router]);

  // The login page renders on its own, with no sidebar/shell.
  if (isLoginPage) return children;

  if (status === "checking") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex min-h-screen flex-col items-center justify-center gap-4 bg-cream-100 px-6 text-center text-navy-400"
      >
        <span
          aria-hidden="true"
          className="h-9 w-9 animate-spin rounded-full border-[3px] border-navy-100 border-t-crimson"
        />
        <p className="text-sm font-medium">Checking your session…</p>
      </div>
    );
  }

  if (status === "denied") {
    return null; // redirect is already underway
  }

  return (
    <div className="flex min-h-screen bg-cream-100">
      <AdminSidebar user={user} />

      {/*
        min-w-0 is the important part: without it a flex child refuses to shrink
        below the width of its widest content, so on phones the whole admin
        grows wider than the screen. overflow-x-clip is a safety net that (unlike
        overflow-hidden) does not break the sticky topbar.
      */}
      <div className="flex min-h-screen min-w-0 flex-1 flex-col overflow-x-clip">
        <AdminTopbar user={user} />
        <main className="w-full min-w-0 flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}