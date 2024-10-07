import { PostType } from "../../types/post";
import React, { useState, useEffect } from "react";
import PostCard from "../PostsPage/PostPage";
import styles from "./PostPageWrapper.module.css";
import { GroupType } from "@/types/group";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";


type PostCardWrapper = {
    group: GroupType;
    posts: PostType[];
};

const PostCardsWrapper = ({ group ,posts }: PostCardWrapper) => {
    const [joinedBtn, setJoinedBtn] = useState(Boolean)
    const router = useRouter();

    
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
    const fetchGroupFromCookies = async () =>  {
        try{
            const groupId = router.query.id;
            const retrievedGroups = Cookies.get("joined_groups")
            if(retrievedGroups){
                const parsedGroups = JSON.parse(retrievedGroups)
                const isGroupJoined = parsedGroups.some((group: any) => group.id === groupId)
                console.log(isGroupJoined)
                if(isGroupJoined === true){
                    setJoinedBtn(true)
                } else {
                    setJoinedBtn(false)
                }
            }
        } catch (err) {
            console.log("Failed to parse groups", err)
        }
    };
    
    useEffect(() => {
        fetchGroupFromCookies();
    }, []);

    const currentUserId = getUserIdfromToken();
    

    const handleJoinLeaveGroup = async () => {
        try{
            const headers = {
                authorization: Cookies.get("jwt_token")
            }
            const retrievedGroups = Cookies.get("joined_groups")
            let parsedGroups = [];
            if(retrievedGroups){
                parsedGroups = JSON.parse(retrievedGroups)
            } else {
                console.log("Please log in to see groups");
                return
            }
                const groupId = router.query.id;
                const isGroupJoined = parsedGroups.some((group: any) => group.id === groupId)
                const response = await axios.post(`${process.env.SERVER_URL}/group/${router.query.id}`,
                    currentUserId,
                    { headers })
                if(response.status === 200){
                    if(isGroupJoined) {
                        parsedGroups = parsedGroups.filter((group: any) => group.id !== groupId)
                        setJoinedBtn(false)
                    } else {
                        parsedGroups.push({
                            id: groupId,
                            name: response.data.joinedGroup.name,
                            created_at: response.data.joinedGroup.created_at
                        })
                        setJoinedBtn(true)
                    }
                    Cookies.set("joined_groups", JSON.stringify(parsedGroups))
                } else {
                    console.log("Failed to join/leave group")
                }
    } catch (err) {
        console.log("Error occurred while joining/leaving group", err);
    }
};

    
    

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
                       <Link href={`/submit`}><button><span>+</span>Create post</button></Link>
                        <button onClick={handleJoinLeaveGroup}>{joinedBtn ? "Joined" : "Join"}</button>
                    </div>
                </div>
            </div>
            {posts.map((post) => {
                const initialReactionCount = post.reactions.reduce((acc, reaction) => {
                    return acc + (reaction.reaction_type === 'like' ? 1 : -1);
                }, 0);

                const userReaction = post.reactions.find(
                    (reaction) => reaction.user_id === currentUserId)?.reaction_type || "none";
                return (
                    <PostCard
                        id={post.id}
                        key={post.id}
                        title={post.title}
                        content_type={post.content_type}
                        content_text={post.content_text}
                        content_image={post.content_image}
                        content_link={post.content_link}
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