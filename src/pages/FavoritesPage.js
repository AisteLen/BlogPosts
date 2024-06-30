import React, { useEffect, useState } from 'react';
import SinglePost from "../components/SinglePost";
import useStore from "../store//mainStore.js"

const FavoritesPage = ({ logged }) => {

    const { favorites } = useStore();

    return (
        <div className="d-flex flex-wrap AndriusPosts">
            {favorites.length === 0 ? (
                <h1>No favorites yet</h1>
            ) : (
                favorites.map((post, i) => (<SinglePost item={post} key={i} logged={logged}/>
                ))
            )}
        </div>
    );
};

export default FavoritesPage;

