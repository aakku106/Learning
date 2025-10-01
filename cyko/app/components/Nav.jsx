/** @format */

import Link from "next/link";
import React from "react";

export default function Nav() {
  return (
    <>
      <nav className="flex gap-4 p-4 bg-slate-200">
        <Link href="/">Home</Link>
        <Link href="/count">Count</Link>
        <Link href="/about">About</Link>
      </nav>
    </>
  );
}
