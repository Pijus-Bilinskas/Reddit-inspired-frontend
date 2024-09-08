import React, {useState, useEffect} from "react";
import styles from "./PostPage.module.css";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";


type PostCardProps = {
    id: string;
    title: string;
    content: string;
    created_at: string;
    initialReactionCount: number;
}

const PostCard = ({ id, title, content, created_at, initialReactionCount}: PostCardProps) => {
    const [reactionCount, setReactionCount] = useState(initialReactionCount);

    const headers = {
        authorization: Cookies.get("jwt_token")
    }

    const handleLike = async () => {
     await axios.post(`${process.env.SERVER_URL}/post/${id}/react`,
            { reaction_type: "like" },
            { headers}
        )
    }
    // make it change the color of the like or dislike according to what you have pressed 
    // and then fix the like and dislike number 

    const handleDislike = async () => {
        await axios.post(`${process.env.SERVER_URL}/post/${id}/react`,
            { reaction_type: "dislike" },
            {headers}
        )
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