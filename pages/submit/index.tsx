import PageTemplate from "@/components/PageTemplate/PageTemplate"
import CreatePost from "@/components/PostSubmit/PostSubmit"


const SubmitPost = () => {

    // a way to fetch the groups which can be selected

    return(
        <PageTemplate>
            <div>
                <CreatePost />
            </div>
        </PageTemplate>
    )

}

export default SubmitPost