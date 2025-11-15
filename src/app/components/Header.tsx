"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, loading } = useAuth();

  const shouldHideHeader = useMemo(() => {
    if (!pathname) return false;
    return pathname.startsWith("/login") || pathname.startsWith("/register");
  }, [pathname]);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  if (shouldHideHeader || loading) return null;

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur supports-backdrop-filter:bg-white/60 border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative h-8 w-8">
              <Image src="/next.svg" alt="Logo" fill sizes="32px" className="object-contain" />
            </div>
            <span className="text-gray-900 font-semibold text-lg group-hover:text-blue-600 transition-colors">TrainTicket</span>
          </Link>
        </div>

        <div className="hidden md:block text-sm text-gray-600">Your one-stop solution for train travel.</div>

        <nav className="flex items-center gap-2">
          {!user && (
            <>
              <button
                onClick={() => router.push("/login")}
                className="px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Login
              </button>
              <button
                onClick={() => router.push("/register")}
                className="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
              >
                Register
              </button>
            </>
          )}
          {user && (
            <>
              <span className="text-sm font-medium text-gray-700">Welcome, {user.username}</span>
              <button
                onClick={() => router.push(user.role === "ADMIN" ? "/profile/admin" : "/profile/user")}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-800 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
              >
                Profile
              </button>
              <button
                onClick={() => router.push("/transactions")}
                className="px-3 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                Transactions
              </button>
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}


