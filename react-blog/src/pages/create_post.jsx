import React, { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import {db, auth} from "../firebase-config"
import { useNavigate } from "react-router-dom";

function CreatePost({isAuth}){

    const [title, setTitle] = useState("");
    const [postText, setPostText] = useState("");
    const [imageLink, setImageLink] = useState("");
    const [gitLink, setGitLink] = useState("");

    const postsCollectionsRef = collection(db, "posts");

    let navigate = useNavigate();

    const createPost = async () => {
        await addDoc(postsCollectionsRef, {
            title, 
            postText, 
            imageLink,
            gitLink,
            author: {
                name: auth.currentUser.displayName, 
                id: auth.currentUser.uid
            }
        })
        navigate("/");
    }

    useEffect(() => {
        if(!isAuth){
            navigate("/login");
        }
    }, []);

    return <div className="createPostPage">
        <div className="cpContainer">
            <h1>Create A Post</h1>
            <div className="inputGroup">
                <label>Title</label>
                <input placeholder="Title..." onChange={(event) => {setTitle(event.target.value)}} />
            </div>
            <div className="inputGroup">
                <label>Post</label>
                <textarea placeholder="Post..." onChange={(event) => {setPostText(event.target.value)}}/>
            </div>
            <div className="inputGroup">
                <label>Image Link</label>
                <input placeholder="Link..." onChange={(event) => {setImageLink(event.target.value)}}/>
            </div>
            <div className="inputGroup">
                <label>GitHub Link</label>
                <input placeholder="link..." onChange={(event) => {setGitLink(event.target.value)}}/>
            </div>
            <button onClick={createPost}>Submit Post</button>
        </div>
    </div>;
}

export default CreatePost;