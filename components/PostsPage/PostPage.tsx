import React, {useState} from "react";
import styles from "./PostPage.module.css";
import Link from "next/link";
import axios from "axios";


type PostCardProps = {
    id: string;
    title: string;
    content: string;
    created_at: string;
    initialReactionCount: number;
}

const PostCard = ({ id, title, content, created_at, initialReactionCount}: PostCardProps) => {
    const [reactionCount, setReactionCount] = useState(initialReactionCount);

    const handleLike = async () => {
        setReactionCount(reactionCount + 1)
        await axios.post(`${process.env.SERVER_URL}//post/${id}/react`)
    }

    const handleDislike = async () => {
        setReactionCount(reactionCount - 1)
        await axios.post(`${process.env.SERVER_URL}//post/${id}/react`)
    }


    return(
        <div className={styles.PostCard__padding}>
        <Link href={`/comments/${id}`}  className={styles.PostCard}>
            <h2>{title}</h2>
            <p>{created_at}</p>
            <h4>{content}</h4>
        </Link>
            <div className={styles.Reaction_buttons}>
            <button onClick={handleLike} className={styles.Like_button}>👆</button>
            <span>{reactionCount}</span>
            <button onClick={handleDislike} className={styles.Dislike_button}>👇</button>
            </div>
        </div>
    )
}

export default PostCard;