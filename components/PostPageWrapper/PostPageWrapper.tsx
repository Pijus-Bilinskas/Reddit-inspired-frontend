import { PostType } from "../../types/post";
import React from "react";
import PostCard from "../PostsPage/PostPage";
import styles from "./PostPageWrapper.module.css";
import { GroupType } from "@/types/group";

type PostCardWrapper = {
    group: GroupType;
    posts: PostType[];
};

const PostCardsWrapper = ({ group ,posts }: PostCardWrapper) => {
    return(
        <div className={styles.PostCard__padding}>
            <div className={styles.group__padding}>
            <h2>{group.name}</h2>
            </div>
            {posts.map((post) => (
                <PostCard
                id={post.id}
                key={post.id}
                title={post.title}
                content={post.content}
                created_at={post.created_at}
                />
            ))}
        </div>
    )
}

export default PostCardsWrapper;