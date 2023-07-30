import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../components/Redux/PostAction';
import { Link } from 'react-router-dom';
import './PostList.css'

const PostList = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector(state => state);
  console.log("========= post", posts);
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(10);
  const [arr, setArr] = useState([])

  const data = arr.length ? arr : posts.arr


  useEffect(() => {
    console.log("============ first useeffect", limit);
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
    console.log("========data", start);
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  console.log("========== data", data, "arr", arr);
  return (
    <>
      <div className='link_div'>
        <Link to="/createpost">Create Post</Link>
      </div>
    <div className='main_div'>
      {data && data.length === 0 ? (
        <div>No posts found</div>
      ) : (
        <>
          {data && data.map((post, index) => (
            <Link  to={`/post/${post.id}`}>
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

      <div>
        <button onClick={dataForPrevPage}>prev</button>
        <button onClick={dataForNextPage}>next</button>
      </div>
    </div>
    </>
  );
};

export default PostList;