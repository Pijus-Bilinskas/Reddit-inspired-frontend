export type ReactionType = {
    reaction_type: `like` | `dislike`;
}



export type PostType = {
    id: string;
    group_id: string;
    user_id: string;
    title: string;
    content: string;
    created_at: string;
    reactions: ReactionType[];
}