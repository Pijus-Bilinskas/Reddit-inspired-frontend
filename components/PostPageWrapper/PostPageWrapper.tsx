import { PostType } from "../../types/post";
import React from "react";
import PostCard from "../PostsPage/PostPage";
import styles from "./PostPageWrapper.module.css";
import { GroupType } from "@/types/group";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";


type PostCardWrapper = {
    group: GroupType;
    posts: PostType[];
};

const PostCardsWrapper = ({ group ,posts }: PostCardWrapper) => {
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
        }
    };

    const currentUserId = getUserIdfromToken();


    return(
        <div className={styles.PostCard__padding}>
            <div className={styles.group__padding}>
                <div className={styles.group_image_large}>
                    <img src={group.image} alt="group image" />
                </div>
                <div className={styles.group_info}>
                    <div className={styles.group_title_img_container}>
                        <img src={group.image} alt="group image" />
                         <h2>r/{group.name}</h2>
                    </div>
                    <div className={styles.group_action_buttons_container}>
                        <button><span>+</span>Create post</button>
                        <button>Join</button>
                    </div>
                </div>
            </div>
            {posts.map((post) => {
                const initialReactionCount = post.reactions.reduce((acc, reaction) => {
                    return acc + (reaction.reaction_type === 'like' ? 1 : -1);
                }, 0);

                const userReaction = post.reactions.find(
                    (reaction) => reaction.user_id === currentUserId)?.reaction_type || "none";
                    console.log(userReaction)
                    console.log("post.reactions", post.reactions)
                    console.log("currentUserId", currentUserId)

                return (
                    <PostCard
                        id={post.id}
                        key={post.id}
                        title={post.title}
                        content={post.content}
                        created_at={post.created_at}
                        initialReactionCount={initialReactionCount}
                        userReaction={userReaction}
                    />
                );
            })}
        </div>
    );
};


export default PostCardsWrapper;