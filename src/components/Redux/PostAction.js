import axios from 'axios';
export const fetchPosts = (start, limit) => {
  return (dispatch) => {
    dispatch({ type: 'FETCH_POSTS_REQUEST' });

    axios.get(`https://jsonplaceholder.typicode.com/posts?_start=${0}&_limit=${limit}`)
      .then(response => {        
        const arr = response.data.splice((start), 10)        
        dispatch({
          type: 'FETCH_POSTS_SUCCESS',
          payload: {arr, limit},
        });
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        dispatch({
          type: 'FETCH_POSTS_FAILURE',
          payload: 'Failed to fetch posts',
        });
      });
  };
};

export const createPost = (title, description) => {
  return (dispatch) => {
    dispatch({ type: 'CREATE_POST_REQUEST' });

    axios.post(`https://jsonplaceholder.typicode.com/posts`, { title, body: description })
      .then(response => {
        dispatch({
          type: 'CREATE_POST_SUCCESS',
          payload: response.data,
        });
      })
      .catch(error => {
        console.error('Error creating post:', error);
        dispatch({
          type: 'CREATE_POST_FAILURE',
          payload: 'Failed to create post',
        });
      });
  };
};
