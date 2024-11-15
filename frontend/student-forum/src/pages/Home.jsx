import React, { useState, useEffect } from 'react';
import { GraduationCap } from 'lucide-react';
import PostCard from '../components/PostCard';
import CreatePost from '../components/CreatePost';
import PostDetail from '../components/PostDetail';
import api from '../api';

function Home({}){
    const [username, setUsername] = useState(() => {
        localStorage.getItem("username");
    });
    const [posts, setPosts] = useState(() => {
        const saved = localStorage.getItem('forum-posts');
        return saved ? JSON.parse(saved) : [];
    });
    const [selectedPost, setSelectedPost] = useState(null);
    
    useEffect(() => {
        localStorage.setItem('forum-posts', JSON.stringify(posts));
    }, [posts]);
    
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
    
    const selectedPostData = posts.find(post => post.id === selectedPost);

    return <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Online Student Discussion Forum</h1>
          </div>
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