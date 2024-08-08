import React from 'react';
import { MapPinIcon, TagIcon, ArrowUpTrayIcon, CogIcon } from '@heroicons/react/16/solid'; // Contoh ikon, sesuaikan dengan kebutuhan Anda

function Sidebar({onSelect}) {
  return (
    <div className="w-64 h-screen bg-black text-white flex flex-col fixed">
      <div className="flex items-center justify-center h-16 bg-gray-900">
        <h1 className="text-2xl font-bold">My App</h1>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        <a onClick={() => onSelect('posts')} href="#" className="flex items-center px-2 py-2 text-sm font-medium text-white rounded-md hover:bg-gray-700">
          <ArrowUpTrayIcon className="w-5 h-5 mr-3" />
          Post
        </a>
        <a onClick={() => onSelect('category')} href="#" className="flex items-center px-2 py-2 text-sm font-medium text-white rounded-md hover:bg-gray-700">
          <TagIcon className="w-5 h-5 mr-3" />
          Category
        </a>
        <a onClick={() => onSelect('region')} href="#" className="flex items-center px-2 py-2 text-sm font-medium text-white rounded-md hover:bg-gray-700">
          <MapPinIcon className="w-5 h-5 mr-3" /> {/* Use the imported CogIcon component */}
          Region
        </a>
        {/* Tambahkan item menu lainnya di sini */}
        {/* saya ingin menambahkan menu seting/help yang isinya logout */}
        <a onClick={() => onSelect('setting')} href="#" className="flex items-center px-2 py-2 text-sm font-medium text-white rounded-md hover:bg-gray-700">
          <CogIcon className="w-5 h-5 mr-3" />
          Setting
        </a>
      </nav>
    </div>
  );
}

export default Sidebar;

