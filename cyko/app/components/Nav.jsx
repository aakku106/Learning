/** @format */

import Link from "next/link";
import React from "react";

export default function Nav() {
  return (
    <>
      <nav className="flex gap-4 p-4 bg-slate-200">
        <a href="/">Home</a>
        <Link href="/">Home</Link>

        <a href="/count">Count</a>
        <Link href="/count">Count</Link>

        <a href="/about">About</a>
        <Link href="/about">About</Link>
      </nav>
    </>
  );
}
