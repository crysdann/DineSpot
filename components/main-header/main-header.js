import React from "react";
import Link from "next/link";
import Image from "next/image";
import logoImg from "@/assets/logo.png";
import classes from "./main-header.module.css";
import MainHeaderBackground from "./main-header-background";
import NavLink from "./nav-link";

function MainHeader() {
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          <Image src={logoImg} alt="A plate with food on it" priority></Image>
          DineSpot
        </Link>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href="/restaurants"></NavLink>
            </li>
            <li>
              <NavLink href="/community"></NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default MainHeader;
