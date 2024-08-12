import PageTemplate from "@/components/PageTemplate/PageTemplate";
import { AnswerType } from "@/types/answer";
import axios from "axios";
import { useRouter } from "next/router";
import React, {useEffect, useState} from "react";
import ItemsWrapper from "../../components/PostWithComments/PostWithComments";
import styles from "./comments.module.css"


const PostAndAnswers = () => {
    const [post, setPost] = useState();
    const [answers, setAnswers] = useState<AnswerType[]>([]);
    const [newAnswer, setNewAnswer] = useState("")
    const router = useRouter();

    const fetchPostAndAnswers = async () => {
        try{
            const response = await axios.get(
                `${process.env.SERVER_URL}/post/${router.query.id}/answers`
            );
            console.log(response)
            setPost(response.data.post)
            setAnswers(response.data.answers)
        } catch (err) {
            console.log("ERROR fetching post with answers", err)
        }
    }

    useEffect(() => {
        router.query.id && fetchPostAndAnswers();
    }, [router])

    return(
        <PageTemplate>
            <div className={styles.post_comments_wrapper}>
               {post && answers && <ItemsWrapper post={post} answers={answers}/>} 
            </div>
        </PageTemplate>
    )

}

export default PostAndAnswers;