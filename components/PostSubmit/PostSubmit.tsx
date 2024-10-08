import styles from "./PostSubmit.module.css"
import React,{ useState } from "react"
import Cookies from "js-cookie"
import axios from "axios"
import { read } from "fs"
import { GroupType } from "@/types/group"
import { jwtDecode } from "jwt-decode"

type GroupSelected = {
    groups: GroupType[];
}

const CreatePost = ({groups}: GroupSelected) => {
    const [selectedGroup, setSelectedGroup] = useState("")
    const [contentType, setContentType] = useState("text");
    const [title, setTitle] = useState("");
    const [textContent, setTextContent] = useState("");
    const [linkContent, setLinkContent] = useState("");
    const [imageContent, setImageContent] = useState("");

    const headers = {
        authorization: Cookies.get("jwt_token")
    }

    const handleContentChange = (e: any) => {
        const file = e.target.files[0];
        if(!file) return;

        const reader = new FileReader();

        reader.onloadend = function () {
            if(reader.result){
              const base64String = reader.result.toString().replace("data", "").replace(/^.+,/, "")
              setImageContent(base64String);
            }
        };
        reader.readAsDataURL(file);
    };


    const submitPost = async () => {
        try{
          
            const post: any = {
                title: title,
                group_id: selectedGroup,
                user_id: getUserIdfromToken(),
                content_type: contentType,
            };

            if(contentType === "text") {
                post.content_text = textContent;
            } else if(contentType === "image") {
                post.content_image = imageContent
            } else if(contentType === "link") {
                post.content_link = linkContent
            }
          await axios.post(`${process.env.SERVER_URL}/group/${selectedGroup}/posts`,
                post,
                { headers }
            )
           
            setTitle("");
            setTextContent("");
            setLinkContent("");
            setImageContent("");
            setContentType("text")
            window.location.href = `/posts/${selectedGroup}`
        } catch (err) {
            console.log("An error occured submitting the post" ,err)
        }
    };


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



    return(
        <div className={styles.post_submit_padding}>
            <h2>Create post</h2>
            <div className={styles.post_submit_group_select}>
                <select name="group" value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)}>
                    {groups.map((group)=> (
                        <option key={group.id} value={group.id}>
                            r/{group.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className={styles.post_submit_content_type_button}>
                <button onClick={() => setContentType("text")}>Text</button>
                <button onClick={() => setContentType("image")}>Image/Vid</button>
                <button onClick={() => setContentType("link")}>Link</button>
            </div>
            <div className={styles.post_submit_post_title}>
                <input type="text"
                placeholder="Post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)} 
                />
            </div>
            <div className={styles.post_submit_content_type_input_area}>
                {contentType === "text" && (
                    <textarea
                    className={styles.post_submit_text_content_type_input}
                    placeholder="Write your post here...."
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                     />
                )}
                {contentType === "link" && (
                    <input type="text"
                    className={styles.post_submit_link_content_type_input} 
                    placeholder="Enter a link...."
                    onChange={(e) => setLinkContent(e.target.value)}
                    />
                )}
                {contentType === "image" && (
                    <input type="file"
                    className={styles.post_submit_image_content_type_input}
                    accept="image/*"
                    onChange={handleContentChange}
                    />
                )}
            </div>
            <div className={styles.post_submit_post_submition_button}>
                <button onClick={submitPost}>Submit Post</button>
            </div>
        </div>
    )

}
export default CreatePost;