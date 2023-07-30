import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './createPost.css'
import LoadingScreen from './loading';


const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios.post(apiUrl, { title, body: description, userId:11 })
      .then(response => {
        setLoading(false);
        setSuccess(true);
        setTitle('');
        setDescription('');
        // to control the time of redirect to list page which configuarable
        if(response.status === 201 || response.status === 200){
          setTimeout(() => {
            navigate("/")
          },100)
        }
      })
      .catch(error => {
        console.error('Error creating post:', error);
        setLoading(false);
        setSuccess(false);
      });
  };

  return (
    <div>
      {!loading && <div className='create_new_post_maindiv'>
        <h1 className='h1_sect'>{success ? "Post Created" : "Create New Post"}</h1>
        {success ? (
          <div className='successfully'>
            <p>Post created successfully!</p>
            <button className='btn_3' onClick={() => setSuccess(false)}>Create Another Post</button>
          </div>
        ) :  ( !loading &&
          <form onSubmit={handleSubmit}>
            <div className='title_section'>
              <label htmlFor="title">Title*</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className='description_section'>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={1000}
              />
            </div>
            <div className='btn_1_wrapper'>
            <button className='btn_1' type="submit" disabled={loading}>Submit</button>
            </div>
          </form>
        )}
      </div>}
      {loading && <LoadingScreen/>}
    </div>
  );
};

export default CreatePost;