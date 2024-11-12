import React from 'react';
import { MessageSquare, ThumbsUp, Clock } from 'lucide-react';

export default function PostCard({ post, onLike, onClick }) {
  return (
    <div 
      className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onClick(post.id)}
    >
      <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
      <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
      
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Clock size={16} />
            {new Date(post.timestamp).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-1">
            <MessageSquare size={16} />
            {post.comments.length}
          </span>
        </div>
        
        <button 
          className="flex items-center gap-1 hover:text-blue-600 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onLike(post.id);
          }}
        >
          <ThumbsUp size={16} />
          {post.likes}
        </button>
      </div>
      
      <div className="mt-2 text-sm text-gray-500">
        Posted by {post.author}
      </div>
    </div>
  );
}