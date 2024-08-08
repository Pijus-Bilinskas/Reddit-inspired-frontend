import React from "react";
import styles from "./PostPage.module.css";
import Link from "next/link";

type PostCardProps = {
    id: string;
    title: string;
    content: string;
    created_at: string;
}

const PostCard = ({ id, title, content, created_at}: PostCardProps) => {
    return(
        <Link href={`/post/${id}`} className={styles.PostCard__padding}>
        <div className={styles.PostCard}>
            <h2>{title}</h2>
            <p>{created_at}</p>
            <h4>{content}</h4>
        </div>
        </Link>
    )
}

export default PostCard;