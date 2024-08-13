import React, {ReactNode, useState} from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./PageTemplate.module.css"
import LoginFormModal from "../SignInModal/SignInModal";

type PageTemplateProps = {
    children: ReactNode;
};



const PageTemplate = ({ children}: PageTemplateProps) => {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);

    const handleOpenLoginModal = () => {
        setLoginModalOpen(true);
    }
    const handleCloseLoginModal = () => {
        setLoginModalOpen(false)
    }

    const links = [
        { id: 1, title: "Login", onclick: handleOpenLoginModal },
        { id: 2, title: "Main", href: "/" },
        { id: 3, title: "placeholder", href: "" }
    ]
    

    return(
        <div className={styles.PageTemplate__wrapper}>
            <Header WebTitle={"Reddit"} links={links}/>
            {children}
            <LoginFormModal showModal={isLoginModalOpen} closeModal={handleCloseLoginModal} />
        </div>
    );
};

export default PageTemplate;