import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import React from "react";

const RootLayout = ({children}:{children:ReactNode}) => {
    return (
        <div className = "root-layout">
            <nav>
                <Link href="/" className ="flex items-center gap-2">
                    <Image src="/logo.svg" alt="Logo" width={32} height={32} />
                </Link>
                <h2 className ="text-primary-100">VoxInterview</h2>
            </nav>
        </div>
    );
};

export default RootLayout;