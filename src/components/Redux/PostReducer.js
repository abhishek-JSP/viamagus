const initialState = {
    posts: [],
    loading: false,
    error: null,
    limit: 10
  };
  
  const postReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_POSTS_REQUEST':
        return {
          ...state,
          loading: true,
          error: null,
        };
      case 'FETCH_POSTS_SUCCESS':
        return {
          ...state,
          loading: false,
          posts: action.payload,
          limit: action.payload.limit
        };
      case 'FETCH_POSTS_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case 'CREATE_POST_REQUEST':
        return {
          ...state,
          loading: true,
          error: null,
        };
      case 'CREATE_POST_SUCCESS':
        return {
          ...state,
          loading: false,
          posts: [...state.posts, action.payload],
        };
      case 'CREATE_POST_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default postReducer;
  