import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import SinglePost from "../components/SinglePost";

const OneUserPostsPage = () => {
    const params = useParams();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("http://167.99.138.67:1111/getuserposts/"+ params.name)
            .then(res => res.json())
            .then(res => {
                setPosts(res.data);
            })
    }, []);

    return (
        <div className="d-flex flex-wrap AndriusPosts">
            {posts.length === 0 ? (
                <h1>Loading...</h1>
            ) : (
                posts.map((post, i) => (
                    <SinglePost item={post} key={i}/>
                ))
            )}
        </div>
    );
};

export default OneUserPostsPage;
