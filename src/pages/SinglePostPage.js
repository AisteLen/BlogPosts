import React, {useEffect} from 'react';
import SinglePost from "../components/SinglePost.js";
import {useParams} from "react-router-dom";


const SinglePostPage = ({logged}) => {

    const params = useParams();
    const [posts, setPosts] = React.useState(null);

    useEffect(() => {
        fetch("http://167.99.138.67:1111/getsinglepost/"+params.name+"/"+ params.id)
            .then(res => res.json())
            .then(res => {
                setPosts(res.data)
            })
    }, [params.name, params.id]);

    return (
        <div className="d-flex flex-wrap">
            {posts && <SinglePost logged={logged} item={posts} isDetailed={true}/>}

        </div>
    );
};

export default SinglePostPage;