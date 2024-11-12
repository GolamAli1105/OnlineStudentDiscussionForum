import React, { useState } from 'react';
import { Send } from 'lucide-react';

export default function CreatePost({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSubmit(title, content);
      setTitle('');
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
      
      <input
        type="text"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      
      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 mb-4 border rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      
      <button
        type="submit"
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Send size={16} />
        Post
      </button>
    </form>
  );
}