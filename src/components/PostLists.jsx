import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../components/Redux/PostAction';
import { Link } from 'react-router-dom';
import './PostList.css'
import LoadingScreen from './loading';

const PostList = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector(state => state);
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    dispatch(fetchPosts(start, limit));
  }, [limit]);

  const dataForNextPage = () => {
    if (start < 90 && limit < 100) {
      setStart(prev => {
        if (prev < 90) {
          return prev + 10 
        }
        return prev
      })
      setLimit(prev => {
        if (prev < 100) {
          return prev + 10
        }
        return prev
      });
    }
  }

  const dataForPrevPage = () => {
    if (start >= 0 && limit >= 10)
      setStart(prev => {
        if (prev > 0) {
          return prev - 10
        }
        return prev
      })
    setLimit(prev => {
      if (prev > 10) {
        return prev - 10
      }
      return prev
    })
  }


  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <>
      <div className='link_div'>
        <Link to="/createpost">Create Post</Link>
      </div>
    <div className='main_div'>
      {posts.arr && posts.arr.length === 0 ? (
        <div>No posts found</div>
      ) : (
        <>
          {posts.arr && posts.arr.map((post, index) => (
            <Link to={`/post/${post.id}`}>
              <div className='div_section' key={post.id}>
                <h3 className='link_section'> Serial:{index+1}</h3>
                <div>
                <h2 className='h2_section'>{post.title}</h2>
                <p className='p_section'>{post.body}</p>
                </div>
                <hr />
              </div>
            </Link>
          ))}
        </>
      )}

      
    </div>
    <div className='btn'>
        <button onClick={dataForPrevPage}>Prev</button>
        <button onClick={dataForNextPage}>Next</button>
      </div>
    </>
  );
};

export default PostList;