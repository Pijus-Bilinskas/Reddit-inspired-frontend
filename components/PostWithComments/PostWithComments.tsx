import { useRouter } from "next/router";
import { AnswerType } from "../../types/answer";
import { PostType } from "../../types/post";
import React, { useState } from "react";
import styles from "./PostWithComments.module.css";




type ItemWrapperProps = {
    post: PostType;
    answers: AnswerType[]
}

const ItemsWrapper = ({ post, answers}: ItemWrapperProps) => {
    const router = useRouter();
    const [answerList, setAnswerList] = useState(answers);


    // const deleteQuestion

    return(
        <main className={styles.Post_comments_main_wrapper}>
                {post && (
                    <div className={styles.post_info_card}>
                    <h2>{post.title}</h2>
                    <h4>{post.created_at}</h4>
                    <p>{post.content}</p>
                    </div>
                )}
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