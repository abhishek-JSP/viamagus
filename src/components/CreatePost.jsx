import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


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
        console.log(response, 'uuuuuu');
        setLoading(false);
        setSuccess(true);
        setTitle('');
        setDescription('');
        if(response.status === 201 || response.status === 200){
          setTimeout(() => {
            navigate("/")
          },2000)
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
      <h1>Create New Post</h1>
      {success ? (
        <div >
          <p>Post created successfully!</p>
          <button onClick={() => setSuccess(false)}>Create Another Post</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title (mandatory)</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div >
            <label htmlFor="description">Description (max 1000 characters)</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={1000}
            />
          </div>
          <button type="submit" disabled={loading}>Submit</button>
          {loading && <div>Loading...</div>}
        </form>
      )}
    </div>
  );
};

export default CreatePost;