import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import useStore from '../store/mainStore.js';

const Toolbar = ({ logged, setLogged, applyFilter }) => {
    const [isFilterBoxVisible, setIsFilterBoxVisible] = useState(false);

    const {
        favoritesCount,
        setFavoritesCount,
        filter,
        setFilter,
        clearFilter
    } = useStore();

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavoritesCount(storedFavorites.length);
    }, [setFavoritesCount]);

    const logoutUser = () => {
        localStorage.removeItem("secretKey");
        localStorage.removeItem("name");
        setLogged(null);
    };

    const handleFilterChange = (key, value) => {
        setFilter(key, value);
    };

    const onFilter = () => {
        applyFilter();
    };

    const handleClearFilter = () => {
        clearFilter();
    };

    const toggleFilterBox = () => {
        setIsFilterBoxVisible(!isFilterBoxVisible);
    };

    return (
        <div>
            <div className="toolbar p-4 bg-dark d-flex justify-content-between">
                <div className="d-flex gap-3">
                    <div className="mt-2">
                        <Link className="link" to='/'>Home</Link>
                    </div>
                    <div className="mt-2">
                        {logged && <Link className="link" to='/favorites'>Favorites ({favoritesCount})</Link>}
                    </div>

                    <div className="mt-2">
                        {!logged && <Link className="link" to='/createaccount'>Register</Link>}
                    </div>
                    <div className="mt-2">
                        {!logged && <Link className="link" to='/login'>Login</Link>}
                    </div>
                    <div className="mt-2">
                        {logged && <Link className="link" to='/createpost'>Create Post</Link>}
                    </div>
                    <div>
                        {logged && <button className="filter" onClick={toggleFilterBox}>Filter ▼</button>}
                    </div>
                </div>

                <div className="d-flex">
                    <div className="text-primary pt-2">
                        {logged && `logged in as ${logged}`}
                    </div>
                    <div>
                        {logged && <button onClick={logoutUser} className="logout">Log out</button>}
                    </div>
                </div>
            </div>

            <div className={`filterBox ${isFilterBoxVisible ? 'd-block' : 'd-none'}`}>
                <input
                    type="text"
                    placeholder="Find by Username"
                    value={filter.username}
                    onChange={(e) => handleFilterChange('username', e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Find by word in a title"
                    value={filter.title}
                    onChange={(e) => handleFilterChange('title', e.target.value)}
                />
                <div className="d-flex">
                    <div className="input-group mr-2">
                        <div className="input-group-prepend">
                            <span className="input-group-text mt-1">Date from</span>
                        </div>
                        <input
                            type="date"
                            className="form-control"
                            value={filter.dateFrom}
                            onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                        />
                    </div>

                    <div className="input-group mr-2">
                        <div className="input-group-prepend">
                            <span className="input-group-text mt-1">Date to</span>
                        </div>
                        <input
                            type="date"
                            className="form-control"
                            value={filter.dateTo}
                            onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                        />
                    </div>
                </div>

                <div className="text-center m-3">
                    <button className="btn btn-primary mr-2 mx-3" onClick={onFilter}>
                        Filter
                    </button>

                    <button className="btn btn-secondary" onClick={handleClearFilter}>
                        Clear Filter
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Toolbar;

