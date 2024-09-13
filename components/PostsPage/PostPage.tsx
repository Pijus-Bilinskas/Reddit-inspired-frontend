import React, {useState, useEffect} from "react";
import styles from "./PostPage.module.css";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";


type PostCardProps = {
    id: string;
    title: string;
    content: string;
    created_at: string;
    initialReactionCount: number;
    userReaction: "none" | "like" | "dislike";
}

const PostCard = ({ id, title, content, created_at, initialReactionCount, userReaction: initialUserReaction}: PostCardProps) => {
    const [reactionCount, setReactionCount] = useState(initialReactionCount);
    const [userReaction, setUserReaction] = useState<"none"|"like"|"dislike">(initialUserReaction)

    const headers = {
        authorization: Cookies.get("jwt_token")
    }
    


   const handleReaction = async (reactionType: "like" | "dislike") => {
    try{
        await axios.post(`${process.env.SERVER_URL}/post/${id}/react`,
            { reaction_type: reactionType },
            { headers }
        );
        if(reactionType === userReaction) {
            setUserReaction("none");
            setReactionCount((prevCount) => prevCount + (reactionType === "like" ? -1 : 1))
        } else {
            if(userReaction === "like"){
                setReactionCount((prevCount)=> prevCount - 1);
            } else if (userReaction === "dislike") {
                setReactionCount((prevCount) => prevCount + 1);
            } setReactionCount((prevCount) => prevCount + (reactionType === "like" ? 1 : -1))
            setUserReaction(reactionType)
        }
    } catch (err) {
        console.log("Error occurred while reacting", err)
    }
   };



    // const fetchUserReaction = async () => {
    //     try{
    //         const response = await axios.get(`${process.env.SERVER_URL}/group/${router.query.id}/posts`)
    //         console.log(response)
    //         const { user_reaction } = response.data.posts.reactions;

    //         if(user_reaction === "like" || user_reaction === "dislike"){
    //             setUserReaction(user_reaction)
    //         }
    //     } catch (err) {
    //         console.log("error fetching user reactions", err)
    //     }
    // }


    
    // const handleReaction = async (reactionType: "like" | "dislike") => {
    //     try{
    //     await axios.post(`${process.env.SERVER_URL}/post/${id}/react`,
    //         { reaction_type: reactionType },
    //         { headers}
    //     );
    //     if(reactionType === userReaction) {
    //         setUserReaction("none");
    //         setReactionCount((prevCount) => prevCount + (reactionType === "like" ? -1 : 1 ))
    //     } else {
    //         if(userReaction === "like") {
    //             setReactionCount((prevCount) => prevCount - 1)
    //         } else if (userReaction === "dislike") {
    //             setReactionCount((prevCount) => prevCount + 1)
    //         }
    //         setReactionCount((prevCount)  => prevCount + (reactionType === "like" ? 1 : -1))
    //         setUserReaction(reactionType)
    //         }
        
    //      } catch (err) {
    //     console.log("Error occurred while reacting", err)
    //    }
    // }

    // useEffect(() => {
    //     fetchUserReaction();
    // }, [])




    return(
        <div className={styles.PostCard__padding}>
        <Link href={`/comments/${id}`}  className={styles.PostCard}>
            <h2>{title}</h2>
            <p>{created_at}</p>
            <h4>{content}</h4>
        </Link>
            <div className={styles.Reaction_buttons}>
            <button onClick={() => handleReaction("like")} 
            className={`${styles.Like_button} ${userReaction === "like" ? styles.active_like : ""}`}>👆</button>
            <span  className={`${styles.reaction_count} ${
                        userReaction === "like" ? styles.liked_post : userReaction === "dislike" ? styles.disliked_post : ""
                    }`}
            >{reactionCount}</span>
            <button onClick={() => handleReaction("dislike")} 
            className={`${styles.Dislike_button} ${userReaction === "dislike" ? styles.active_dislike : ""}`}>👇</button>
            </div>
        </div>
    )
}

export default PostCard;