import styles from "./PostSubmit.module.css"
import React,{ useState } from "react"
import Cookies from "js-cookie"
import axios from "axios"
import exp from "constants"
import { read } from "fs"


const CreatePost = () => {
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
            const post = {
                title,
                content_type: contentType,
            };

            if(contentType === "text") {
                post.content_type = textContent;
            } else if(contentType === "image") {
                post.content_type = imageContent
            } else if(contentType === "link") {
                post.content_type = linkContent
            }

            await axios.post(`${process.env.SERVER_URL}/submitpost endpoint`,
                post,
                { headers }
            )
           
            setTitle("");
            setTextContent("");
            setLinkContent("");
            setImageContent("");
            setContentType("text")
        } catch (err) {
            console.log("An error occured submitting the post" ,err)
        }
    };



    return(
        <div className={styles.post_submit_padding}>
            <h2>Create post</h2>
            <div className={styles.post_submit_group_select}>
                <select name="group" value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)}>
                    <option value="">select group</option>
                    {/* add options dinamycally basend on groups that user can choose */}
                    <option value="group1">Group 1</option>
                    <option value="group2">Group 2</option>
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