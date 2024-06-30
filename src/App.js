import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Toolbar from "./components/Toolbar.js";
import AllPostsPage from "./pages/AllPostsPage.js";
import OneUserPostsPage from "./pages/OneUserPostsPage.js";
import SinglePostPage from "./pages/SinglePostPage.js";
import RegisterPage from "./pages/RegisterPage.js";
import LoginPage from "./pages/LoginPage.js";
import CreatePostPage from "./pages/CreatePostPage.js";
import UpdatePostPage from "./pages/UpdatePostPage.js";
import FavoritesPage from "./pages/FavoritesPage.js";
import useStore from './store/mainStore.js';

function App() {
  const [loggedIn, setLoggedIn] = useState(null);
  const { setPosts } = useStore();

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setLoggedIn(storedName);
    }
  }, []);

  const applyFilter = () => {
    setPosts(posts => [...posts]);
  };

  return (
      <div>
        <BrowserRouter>
          <div>
            <Toolbar logged={loggedIn} setLogged={setLoggedIn} applyFilter={applyFilter} />
            <Routes>
              <Route element={<AllPostsPage logged={loggedIn} />} path="/" />
              <Route element={<FavoritesPage logged={loggedIn} />} path="/favorites" />
              <Route element={<OneUserPostsPage logged={loggedIn} />} path="/posts/:name" />
              <Route element={<SinglePostPage logged={loggedIn} />} path="/posts/:name/:id" />
              <Route element={<RegisterPage />} path="/createaccount" />
              <Route element={<LoginPage setLog={setLoggedIn} />} path="/login" />
              <Route element={<CreatePostPage />} path="/createpost" />
              <Route element={<UpdatePostPage />} path="/updatepost" />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
  );
}

export default App;
