
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingScreen from './loading';
import './postDetail.css'

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);

  const apiUrl = `https://jsonplaceholder.typicode.com/posts/${postId}`;

  useEffect(() => {
    setLoading(true);
    axios.get(apiUrl)
      .then(response => {
        setPost(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching post details:', error);
        setLoading(false);
      });
  }, [postId]);

  return (
    <div >
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className='post_div'>
          <h2 className='h2_sec'>{post.title}</h2>
          <p className='p_sec'>{post.body}</p>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
