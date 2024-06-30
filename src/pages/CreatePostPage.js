import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import http from "../plugins/http.js"

const CreatePostPage = () => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

   async function createPost() {
        const userData = {
            secretKey: localStorage.getItem("secretKey"),
            title: title,
            image: image,
            description: description
        };

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        };

       const res = await http.post("/createpost", userData)

            console.log(res)
            if(res.success) {
                navigate("/")
            }
        }

    return (
        <div>
            <div className="form text-center">
                <h2>Create Post</h2>
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
                <button onClick={createPost}>Create post</button>
                <button onClick={() => navigate('/')}>Go back to all posts</button>
            </div>
        </div>
    );
};

export default CreatePostPage;
