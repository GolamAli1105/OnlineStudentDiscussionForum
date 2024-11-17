import React, { useState, useEffect } from 'react';
import { GraduationCap } from 'lucide-react';
import PostCard from '../components/PostCard';
import CreatePost from '../components/CreatePost';
import PostDetail from '../components/PostDetail';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function Home({}){
    const [username, setUsername] = useState(() => {
        localStorage.getItem("username");
    });
    const [posts, setPosts] = useState(() => {
        const saved = localStorage.getItem('forum-posts');
        return saved ? JSON.parse(saved) : [];
    });
    const [searchTitle, setSearchTitle] = useState('');
    const [selectedPost, setSelectedPost] = useState(null);
    
    useEffect(() => {
        localStorage.setItem('forum-posts', JSON.stringify(posts));
    }, [posts]);
    
    const fetchPosts = async (query = '') => {
      try {
          const response = await api.get(`/posts/?title=${query}`);
          setPosts(response.data);
      } catch (error) {
          console.error('Error fetching posts:', error);
      }
  };

  useEffect(() => {
      fetchPosts();
  }, []);

  const handleSearch = () => {
      fetchPosts(searchTitle);
  };

    const handleCreatePost = (title, content) => {
        const username = localStorage.getItem("username") || "Anonymous User";
        const newPost = {
          id: Date.now().toString(),
          title,
          content,
          author: username,
          timestamp: Date.now(),
          upvotes: 0,
          downvotes: 0,
          comments: [],
          upvotedByUser: false,
          downvotedByUser: false,
        };
        setPosts([newPost, ...posts]);
    };
    
    const handleUpvote = (postId) => {
      setPosts(posts.map(post =>
        post.id === postId ? { ...post, upvotes: post.upvotes + 1 } : post
      ));
    };
  
    const handleDownvote = (postId) => {
      setPosts(posts.map(post =>
        post.id === postId ? { ...post, downvotes: post.downvotes + 1 } : post
      ));
    };
    
    const handleComment = (postId, content) => {
        const username = localStorage.getItem("username") || "Anonymous User";
        setPosts(posts.map(post =>
          post.id === postId
            ? {
                ...post,
                comments: [
                  ...post.comments,
                  {
                    id: Date.now().toString(),
                    content,
                    author: username,
                    timestamp: Date.now(),
                    upvotes: 0,
                    downvotes: 0,
                  },
                ],
              }
            : post
        ));
    };

    const handleReport = async (postId) => {
      try {
        const response = await api.post(`/posts/${postId}/report/`);
        if (response.ok) {
          alert("Post reported successfully.");
        } else {
          alert("Failed to report. You may have already reported this post.");
        } 
      } catch (error) {
        alert(error.response?.data?.error || "Failed to report the post.");
      }
    };

    const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem('username'); 
      localStorage.removeItem('ACCESS_TOKEN'); 
      localStorage.removeItem('REFRESH_TOKEN'); 
      navigate('/logout'); 
    };
    
    const navigateToRegister = () => {
      navigate("/register");
    };

    const selectedPostData = posts.find(post => post.id === selectedPost);

    return <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Online Student Discussion Forum</h1>
          </div>
          <div className='mt-4'>
            <div className="mb-4 flex gap-2">
              <input
                type="text"
                placeholder="Search posts by title"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </div>
          </div>
          <button 
            onClick={handleLogout} 
            className="bg-red-500 text-black px-4 py-2 rounded hover:bg-red-600 "
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {selectedPost && selectedPostData ? (
          <PostDetail
            post={selectedPostData}
            onBack={() => setSelectedPost(null)}
            onComment={handleComment}
            onUpvote={handleUpvote}
            onDownvote={handleDownvote}
            onReport={handleReport}
          />
        ) : (
          <>
            <CreatePost onSubmit={handleCreatePost} />
            <div className="space-y-4">
              {posts.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  onUpvote={handleUpvote}
                  onDownvote={handleDownvote}
                  onClick={setSelectedPost}
                  onReport={handleReport}
                />
              ))}
              {posts.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  No posts yet. Be the first to create one!
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
}

export default Home