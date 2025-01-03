import React from 'react';
import { MessageSquare, ThumbsUp, Clock, ThumbsDown, AlertTriangle } from 'lucide-react';

export default function PostCard({ post, onUpvote, onDownvote, onClick }) {
  return (
    <div 
      className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onClick(post.id)}
    >
      <div className='w-full bg-white flex items-center justify-center'>
      <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
      <button
        className="ml-auto text-red-500 hover:text-red-900 transition-colors"
        onClick={() => {
          e.stopPropagation();
          onReport(post.id);
        }}
      >
        <AlertTriangle size={16} />
      </button>
      </div>
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
        
        <div className='flex'>
          <button 
            className="flex items-center gap-1 hover:text-blue-600 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onUpvote(post.id);
            }}
          >
            <ThumbsUp size={16} />
            {post.upvotes}
          </button>
          <button 
            className="flex ml-2 items-center gap-1 hover:text-blue-600 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onDownvote(post.id);
            }}
          >  
            <ThumbsDown size={16} />
            {post.downvotes}
          </button>
        </div>
      </div>
      
      <div className="mt-2 text-sm text-gray-500">
        Posted by {post.author}
      </div>
    </div>
  );
}