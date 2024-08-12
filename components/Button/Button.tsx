import React from "react";
import styles from "./Button.module.css";

type ButtonProps = {
    onClick: () => void;
    title: any;
    type? : "WARNING" | "NORMAL";
    className?: string;
}

const Button = ({
    onClick,
    title,
    type,
    className
}: ButtonProps) => {
    return(
        <button className={`{styles.main} ${type === "WARNING" && styles.warning}
        ${className && className}`} onClick={onClick}
        >
           {title} 
        </button>
    )
}

export default Button;