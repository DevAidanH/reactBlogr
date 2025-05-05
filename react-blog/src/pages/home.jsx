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
        <div className="intro">
            <h1>aidan.dev</h1>
            <nav>
            <a href="#projects">Projects</a>
            <a href="#cv">About</a>
            <a href="#contact">Contact</a>
            </nav>
        </div>

        <div className="hero">
            <h2>Hi, I'm Aidan Humpidge</h2>
            <p>      
                A software developer building clean, functional apps with a focus on performance and simplicity.
            </p>
        </div>

        <section id="projects" className="projects">
            {postLists.map((post) => {
                return (
                    <div className="post" key={post.id}>
                        <div className="post-content">
                            {/* Image on the left */}
                            <div className="post-image">
                                {post.imageLink ? (
                                    <img src={post.imageLink} alt={post.title} />
                                ) : (
                                    <p>No image</p>
                                )}
                            </div>

                            {/* Text and GitHub links on the right */}
                            <div className="post-text">
                                <h4>{post.title}</h4>
                                <p>{post.postText}</p>

                                <div className="github-links">
                                    <a href={post.gitLink} target="_blank" rel="noopener noreferrer">GitHub Repo</a>
                                </div>

                                <div>
                                    {isAuth && post.author.id === auth.currentUser.uid && (
                                        <button onClick={() => { deletePost(post.id); }}>Delete</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </section>

        <section id="cv" className="CV">
            <h3>Check out my CV below</h3>
            <a href="" target="_blank">Click Here</a>
        </section>

        <section id="contact" className="contact">
            <h3>Get in Touch</h3>
            <p>Reach me at <a href="mailto:aidanhumpidge333@gmail.com">aidanhumpidge333@gmail.com</a></p>
            <ul>
                <li><a href="https://github.com/DevAidanH" target="_blank">GitHub</a></li>
                <li><a href="https://www.linkedin.com/in/aidan-humpidge-b33096209/" target="_blank">Linkedin</a></li>
            </ul>
        </section>

    </div>;
}

export default Home;