import PageTemplate from "@/components/PageTemplate/PageTemplate"
import CreatePost from "@/components/PostSubmit/PostSubmit"
import { GroupType } from "@/types/group"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"

const SubmitPost = () => {
    const[groups, setGroups] = useState<GroupType[]>([])

    const fetchGroups = async () =>  {
        const retrievedGroups = Cookies.get("joined_groups")
        if(retrievedGroups){
            try{
                const parsedGroups = JSON.parse(retrievedGroups);
                setGroups(parsedGroups);
            } catch (err) {
                console.log("Failed to parse groups", err)
            }
        }
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    return(
        <PageTemplate>
            <div>
                <CreatePost groups={groups} />
            </div>
        </PageTemplate>
    )

}

export default SubmitPost;