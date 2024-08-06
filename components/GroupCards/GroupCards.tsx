import React from "react";
import styles from "./GroupCards.module.css";
import Link from "next/link";

type GroupCardProps = {
    id: string;
    name: string;
    created_at: string;
};

const GroupCard = ({ id, name, created_at}: GroupCardProps) => {
    return(
        <Link href={`/group/${id}`} className={styles.Group_card_wrapper}>
            <div className={styles.infoCard}>
                <h2>{name}</h2>
                <h4>{created_at}</h4>
            </div>
        </Link>
    )
}

export default GroupCard;