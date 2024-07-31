import React, { useState } from "react";
import styles from "./Header.module.css";
import Link from "next/link";
import burgerBtn from "../../assets/burger-menu-svgrepo-com.svg";
import { link } from "fs";

type LinkType = {
    id: number;
    title: string;
    href: string;
}

type HeaderProps = {
    WebTitle: string;
    links: LinkType[];
}

const Header = ({ WebTitle, links }: HeaderProps) => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    return(
        <header className={styles.header__padding}>
            <Link href={"/"} className={styles.WebTitle}>
            {WebTitle}
            </Link>

            <nav>
                <ul className={styles.header__links}>
                    {links.map((link) => {
                        return(
                            <a href={link.href} key={link.id}>
                                {link.title}
                            </a>
                        )
                    })}
                </ul>
            </nav>

            <button onClick={() => setMobileMenuOpen((prevState) => !prevState)} className={styles.header__burgerBtn}
                >
                <img src={burgerBtn.src} alt="burgerBtn" />
            </button>

            <div className={`${styles.header__mobileMenu} ${isMobileMenuOpen && styles.mobileMenuOpen}`}>
                <ul className={styles.header__mobileMenu_links}>
                    {links.map((link) => {
                        return(
                            <a href={link.href} key={link.id}>{link.title}</a>
                        )
                    })}
                </ul>
            </div>
        </header>
    )
}

export default Header;