import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import React from "react";
import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/dist/client/components/navigation";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) redirect('/sign-in');
  return (
    <div>
      <nav className="flex items-center gap-2 p-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={32} height={32} />
          <h2 className="text-primary-100">VoxInterview</h2>
        </Link>
      </nav>
      <div className="root-layout">
        {children}
      </div>
    </div>
  );
};

export default RootLayout;