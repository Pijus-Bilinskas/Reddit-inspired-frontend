import React, {ReactNode, useState} from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./PageTemplate.module.css"
import LoginFormModal from "../SignInModal/SignInModal";
import RegisterFormModal from "../RegisterModal/RegisterModal";
import { links } from "@/constants/links";

type PageTemplateProps = {
    children: ReactNode;
};



const PageTemplate = ({ children}: PageTemplateProps) => {

    return(
        <div className={styles.PageTemplate__wrapper}>
            <Header WebTitle={"Reddit"} links={links}/>
            <LoginFormModal />
            <RegisterFormModal />
            {children}
        </div>
    );
};

export default PageTemplate;