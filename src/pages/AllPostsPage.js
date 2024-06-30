import React, {useEffect} from 'react';
import SinglePost from "../components/SinglePost.js";
import http from "../plugins/http.js";
import useStore from '../store/mainStore.js';
import Pagination from "../components/Pagination.js";

const AllPostsPage = ({logged}) => {
    const {setPosts, filteredPosts, setCurrentPage, currentPage, postsPerPage} = useStore();

    function getPosts() {
        http.get("/getallposts")
            .then(res => {
                console.log(res)
                setPosts(res.data.reverse())
            })
    }

    useEffect(() => {
        getPosts()
    }, [setPosts])

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts().slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>

            <div className="d-flex flex-wrap">
                {currentPosts.length === 0 ? <h1>Loading...</h1> :
                    currentPosts.map((post, index) => <SinglePost item={post} key={index} logged={logged}/>)
                }
            </div>
            <Pagination/>
        </div>
    );
};

export default AllPostsPage;