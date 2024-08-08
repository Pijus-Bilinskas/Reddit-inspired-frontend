import { PostType } from "@/types/post";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react"
import axios from "axios";
import Cookies from "js-cookie";
import styles from "./post.module.css";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import PostCardsWrapper from "@/components/PostPageWrapper/PostPageWrapper";




const GroupAndPosts = () => {
    const [group, setGroup] = useState();
    const [posts, setPosts] = useState<PostType[]>([]);
    const [newPost, setNewPost] = useState("")
    const router = useRouter();

    const fetchGroupAndPosts = async () => {
        try{
            const response = await axios.get(`${process.env.SERVER_URL}/group/${router.query.id}/posts`)
            console.log(response)
            setGroup(response.data.group)
            setPosts(response.data.posts)
        } catch (err) {
            console.log("ERR while fetching group and posts", err)
        }
    };

    // const handleAddPost = async () => {
    //     try{
    //         const headers = {
    //             authorization: Cookies.get("jwt_token")
    //         };

    //         const response = await axios.post(
    //             `${process.env.SERVER_URL}//group/${router.query.id}/posts`,
    //             { headers }
    //         );
    //         console.log(response)
    //         setPosts([...posts, response.data.response])
    //         setNewPost("")
    //     } catch (err) {
            
    //         // @ts-expect-error this is correct way to catch error

    //         if(err.response.status === 401) {
    //             router.push("")
    //         }
    //     }
    // }

    useEffect(() => {
        router.query.id && fetchGroupAndPosts();
    }, [router]);

    // const isPostInserted = newPost


    return(
        <PageTemplate>
            <div className={styles.post__padding}>
                {group && posts && <PostCardsWrapper group={group} posts={posts}  />}
            </div>
        </PageTemplate>
    )

}

export default GroupAndPosts;