import React from 'react';

function PostItem({ post }) {
  return (
    <div className="article__entry mb-6">
      <div className="article__image mb-4">
        <a href="#">
          <img src={post.image} alt="" className="img-fluid w-full h-auto" />
        </a>
      </div>
      <div className="article__content">
        <ul className="list-inline mb-2">
          <li className="list-inline-item mr-2">
            <span className="text-primary text-blue-500">
              by {post.author}
            </span>,
          </li>
          <li className="list-inline-item">
            <span className="text-gray-600">
              {post.date}
            </span>
          </li>
        </ul>
        <h5 className="text-lg font-semibold">
          <a href="#" className="text-gray-800 hover:text-blue-500">
            {post.title}
          </a>
        </h5>
      </div>
    </div>
  );
}

export default PostItem;