import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const UpdatePostPage = ({ post }) => {
    const location = useLocation();
    post = location.state?.post;
    const [title, setTitle] = useState(post?.title || '');
    const [image, setImage] = useState(post?.image || '');
    const [description, setDescription] = useState(post?.description || '');
    const [errorMessage, setErrorMessage] = useState('');
    const nav = useNavigate();

    const navigate = () => {
        nav("/");
    };

    const updatePost = () => {
        const updatedPostData = {
            secretKey: localStorage.getItem("secretKey"),
            title,
            image,
            description,
            id: post.id
        };

        fetch("http://167.99.138.67:1111/updatepost", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedPostData)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setErrorMessage(res.message);
                if (res.success) {
                    navigate();
                }
            });
    };

    return (
        <div>
            <div className="form text-center">
                <h2>Update Your Post</h2>
                <input
                    type="text"
                    placeholder="Post image link"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <div>{errorMessage}</div>
                <button onClick={updatePost}>Update post</button>
                <button onClick={navigate}>Go back to all posts</button>
            </div>
        </div>
    );
};

export default UpdatePostPage;
