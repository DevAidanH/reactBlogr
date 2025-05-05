import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import {db, auth} from "../firebase-config"


function Home({isAuth}){
    
    const [postLists, setPostList] = useState([]);

    const postsCollectionsRef = collection(db, "posts");

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postsCollectionsRef);
            setPostList( data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }   

        getPosts();
    }, []);

    const deletePost = async (id) => {
        const postDoc = doc(db, "posts", id);
        await deleteDoc(postDoc);
        setPostList(postLists.filter((post) => post.id !== id));
    }

    return <div className="homePage">
        {postLists.map((post) => {
            return <div className="post">
                    {post.title}<br/>
                    <div>            
                        {isAuth && post.author.id === auth.currentUser.uid &&<button onClick={() => {deletePost(post.id);}}>Delete</button>}
                    </div>
                    {post.postText}
                </div>;
        })}
    </div>;
}

export default Home;