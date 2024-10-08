import { useRouter } from "next/router";
import { AnswerType } from "../../types/answer";
import { PostType } from "../../types/post";
import React, { useEffect, useState } from "react";
import styles from "./PostWithComments.module.css";
import Cookies from "js-cookie";
import axios from "axios";
import { jwtDecode } from "jwt-decode";



type ItemWrapperProps = {
    post: PostType;
    answers: AnswerType[]
}

const ItemsWrapper = ({ post, answers}: ItemWrapperProps) => {
    const router = useRouter();
    const [answerList, setAnswerList] = useState(answers);
    const [newComment, setNewComment] = useState("")
    const [isActive, setIsActive] = useState(false)
    const [reactionCount, setReactionCount] = useState<number>(0);
    const [userReaction, setUserReaction] = useState<"none"|"like"|"dislike">("none")
    
    const getUserIdfromToken = () => {
        const token = Cookies.get(`jwt_token`);
        if (!token) {
            console.log("Token not found");
            return null
        }
        try{
            const decodedToken: any = jwtDecode(token);
            return decodedToken.user_id
        } catch (err) {
            console.log("failed to decode token", err)
            return null
    };
}

   const currentUserId = getUserIdfromToken();

    const renderContent = () => {
        switch (post.content_type) {
            case "text":
                return <p>{post.content_text}</p>;
            case "image":
                return (
                    <img
                        src={`data:image/jpeg;base64,${post.content_image}`}
                        alt="Post content"
                        className={styles.post_content_image}/>) ;
            case "link":
                return <a href={post.content_link} >{post.content_link}</a>
            default: 
                return null 
        }
       }

       useEffect(() => {
        const initialReactionCount = post.reactions.reduce((acc: number, reaction: any) => {
            return acc + (reaction.reaction_type === "like" ? 1 : -1);
        }, 0);

        const userInitialReaction = post.reactions.find((reaction: any) => reaction.user_id === currentUserId)?.reaction_type || "none";

        setReactionCount(initialReactionCount);
        setUserReaction(userInitialReaction)
        }, [post.reactions, currentUserId])

        const handleReaction = async (reactionType: "like" | "dislike") => {
            try{
                const headers = {
                    authorization: Cookies.get("jwt_token")
                }

                await axios.post(`${process.env.SERVER_URL}/post/${router.query.id}/react`,
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



       const handleAddAnswer = async () => {
            try{
                const headers = {
                    authorization: Cookies.get("jwt_token")
                }
                const response = await axios.post(
                    `${process.env.SERVER_URL}/post/${router.query.id}/answers`,
                    { content: newComment },
                    { headers }
                )
                console.log(response)
                setNewComment("")
            } catch (err) {
                console.log("error while adding comment", err)
            }
       }

       const handleCancel = () => {
        setNewComment("");
        setIsActive(false)
       }

    return(
        <main className={styles.Post_comments_main_wrapper}>
                {post && (
                    <div className={styles.post_info_card}>
                    <h2>{post.title}</h2>
                    <h4>{post.created_at}</h4>
                <div>{renderContent()}</div>
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
                )}
                <div className={`${styles.post_add_comment_text_area} ${isActive ? styles.active : ""}`}>
                    <input
                    type="text" 
                    placeholder="Add a comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onFocus={() => setIsActive(true)}
                    />
                    {isActive && (
                        <div className={styles.post_add_comment_buttons}>
                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={handleAddAnswer}>Comment</button>
                    </div>
                    )}
                </div>
                 {answers.length > 0 ? (
                        <div className={styles.answers_padding}>
                            {answers.map((answer) => (
                                <div key={answer.id} className={styles.answer_infocard}>
                                    <div>
                                    <h3>{answer.content}</h3>
                                    <p>{answer.created_at}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.answers_none}>No answers yet.</div>
                    )}
        </main>
    )
}

export default ItemsWrapper;