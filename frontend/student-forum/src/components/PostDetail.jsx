import React, { useState } from 'react';
import { ArrowLeft, Send, ThumbsUp } from 'lucide-react';

export default function PostDetail({ post, onBack, onComment, onLike }) {
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onComment(post.id, comment);
      setComment('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
      >
        <ArrowLeft size={20} />
        Back to Posts
      </button>

      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-600 mb-4">{post.content}</p>
      
      <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
        <div className="flex items-center gap-2">
          <span>Posted by {post.author}</span>
          <span>•</span>
          <span>{new Date(post.timestamp).toLocaleDateString()}</span>
        </div>
        
        <button 
          className="flex items-center gap-1 hover:text-blue-600 transition-colors"
          onClick={() => onLike(post.id)}
        >
          <ThumbsUp size={16} />
          {post.likes}
        </button>
      </div>

      <div className="border-t pt-6">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Send size={16} />
              Send
            </button>
          </div>
        </form>

        <div className="space-y-4">
          {post.comments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
              <p className="mb-2">{comment.content}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{comment.author}</span>
                <span>{new Date(comment.timestamp).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}