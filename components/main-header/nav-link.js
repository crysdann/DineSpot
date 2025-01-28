"use client";
import { usePathname } from "next/navigation";
import React from "react";
import classes from "./nav-link.module.css";

function NavLink({ href, children }) {
  const path = usePathname();
  return (
    <div>
      <Link
        href={href}
        className={
          path.startsWith(href)
            ? `${classes.link} ${classes.active}`
            : classes.link
        }>
        {children}
      </Link>
    </div>
  );
}

export default NavLink;
