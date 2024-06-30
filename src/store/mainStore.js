import { create } from 'zustand';

const useStore = create((set, get) => ({
    posts: [],
    currentPage: 1,
    postsPerPage: 10,
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
    favoritesCount: JSON.parse(localStorage.getItem("favorites"))?.length || 0,
    filter: {
        username: '',
        title: '',
        dateFrom: '',
        dateTo: ''
    },
    setFilter: (key, value) => set((state) => ({
        filter: {
            ...state.filter,
            [key]: value
        }
    })),
    clearFilter: () => set({
        filter: {
            username: '',
            title: '',
            dateFrom: '',
            dateTo: ''
        },
    }),
    setPosts: (posts) => set({ posts }),
    setCurrentPage: (page) => set({ currentPage: page }),
    setFavorites: (favorites) => set({ favorites }),
    setFavoritesCount: (count) => set({ favoritesCount: count }),
    incrementFavoritesCount: () => set((state) => ({ favoritesCount: state.favoritesCount + 1 })),
    decrementFavoritesCount: () => set((state) => ({ favoritesCount: state.favoritesCount - 1 })),
    addFavorite: (item) => set((state) => {
        const updatedFavorites = [...state.favorites, item];
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        return { favorites: updatedFavorites, favoritesCount: state.favoritesCount + 1 };
    }),
    removeFavorite: (itemId) => set((state) => {
        const updatedFavorites = state.favorites.filter(fav => fav.id !== itemId);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        return { favorites: updatedFavorites, favoritesCount: state.favoritesCount - 1 };
    }),
    filteredPosts: () => {
        const state = get();
        const { username, title, dateFrom, dateTo } = state.filter;
        return state.posts.filter(post => {
            const postDate = new Date(post.timestamp);
            return (
                (username ? post.username.includes(username) : true) &&
                (title ? post.title.includes(title) : true) &&
                (dateFrom ? postDate >= new Date(dateFrom) : true) &&
                (dateTo ? postDate <= new Date(dateTo) : true)
            );
        });
    }
}));

export default useStore;
