import React from "react";
import styles from "./Footer.module.css"

const Footer = () => {
    return <footer className={styles.wrapper}>
        <div className={styles.adresses}>
        <p>Kedainiai, 18 Lansbergio troba</p>
        <p>Kalabybiskes, EC2A 1AH LT</p>
        <p>©2002 some buis words and AITA</p>
        </div>
    </footer>
}

export default Footer;