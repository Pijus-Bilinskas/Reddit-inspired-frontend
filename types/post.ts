export type ReactionType = {
    user_id: string;
    post_id: string;
    reaction_type: `like` | `dislike`;
}



export type PostType = {
    id: string;
    group_id: string;
    user_id: string;
    title: string;
    content_type: "text" | "image" | "link";
    content_text: string;
    content_image: string;
    content_link: string;
    created_at: string;
    reactions: ReactionType[];
}