import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/mainStore.js';

const SinglePost = ({ item, logged, isDetailed }) => {
    const nav = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [isFavorite, setIsFavorite] = useState(false);
    const { favorites, addFavorite, removeFavorite } = useStore();

    useEffect(() => {
        const isAlreadyFavorite = favorites.some(fav => fav.id === item.id);
        setIsFavorite(isAlreadyFavorite);
    }, [item.id, favorites]);

    function navigate() {
        nav("/posts/" + item.username + "/" + item.id);
    }

    function navigateUser() {
        nav("/posts/" + item.username);
    }

    function navigateUpdate() {
        nav("/updatepost", { state: { post: item } });
    }

    function deletePost() {
        if (window.confirm("Are you sure you want to delete this post?")) {
            const userData = {
                secretKey: localStorage.getItem("secretKey"),
                id: item.id
            };

            const options = {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(userData)
            };

            fetch("http://167.99.138.67:1111/deletepost", options)
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    setErrorMessage(res.message);
                    nav("/");
                });
        }
    }

    const addToFavorites = () => {
        if (logged) {
            addFavorite(item);
            setIsFavorite(true);
        } else {
            alert("Just logged users can add to favorites.");
        }
    };

    const removeFromFavorites = () => {
        if (logged) {
            removeFavorite(item.id);
            setIsFavorite(false);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('lt-LT', options).format(date);
    };

    return (
        <div className={`post ${isDetailed ? 'detailed-post' : ''}`}>
            <img src={item.image} alt="" className={isDetailed ? 'detailed-image' : ''}/>
            <div className="post-content">
                <h3 onClick={navigateUser}>Username: {item.username}</h3>
                <div onClick={navigate} className="title">Title: {item.title}</div>
                <div>Description: {item.description}</div>
                {isDetailed && <div>Created At: {formatDate(item.timestamp)}</div>}
                <div>
                    {item.username === logged && (
                        <div className="d-flex">
                            <button onClick={navigateUpdate}>Update post</button>
                            <button onClick={deletePost}>Delete post</button>
                        </div>
                    )}

                    {isFavorite ? (
                        <button onClick={removeFromFavorites}>Remove from favorites</button>
                    ) : (
                        <button onClick={addToFavorites}>Add to favorites</button>
                    )}
                </div>
            </div>
            {errorMessage && <div>{errorMessage}</div>}
        </div>
    );
};

export default SinglePost;
