/* eslint-disable import/no-anonymous-default-export */
import { FETCH_ALL, FETCH_BY_SEARCH, CREATE, UPDATE, LIKE, COMMENT, DELETE, START_LOADING, END_LOADING, FETCH_ONE } from "../constants/actionTypes";

export default (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case FETCH_ONE:
            return { ...state, post: action.payload.post };
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload };
        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] };
        case UPDATE:
        case LIKE:
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case COMMENT:
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case DELETE:
            return { ...state, posts: state.posts.filter((post) => (post._id !== action.payload)) };
        default:
            return state;
    }
}