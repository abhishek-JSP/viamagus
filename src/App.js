// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreatePost from './components/CreatePost';
import PostList from './components/PostLists';
import PostDetail from './components/PostDetail';
import CreateNewPost from './components/CreateNewPost';

function App() {
  return (
   <>
    <Router>
        <Routes>
          <Route exact path="/" element={<PostList/>} />
          <Route path="/createpost" element={<CreatePost/>} />
          <Route path="/post/:postId" element={<PostDetail/>} />
        </Routes>
    </Router>

    
   </>
  );
}

export default App;
