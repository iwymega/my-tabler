import React, { useState} from 'react';
import Sidebar from "../components/Sidebar";
import CategoryList from "./CategoryList";
import PostList from "./PostList";
import RegionForm from "../components/RegionForm";
import Editor from "../components/TeksEditor";
import Header from "../components/Header"; // Pastikan Anda mengimpor Header

function Dashboard() {
  const [selectedComponent, setSelectedComponent] = useState('dashboard');

  const renderContent = () => {
    switch (selectedComponent) {
      case 'posts':
        return <PostList />;
      case 'category':
        return <CategoryList />;
      case 'region':
        return <RegionForm />;
      default:
        return <h1>Welcome to the Dashboard</h1>;
    }
  };

  return (
    <div className="page">
      <Sidebar onSelect={setSelectedComponent} className="w-64 bg-black text-white" />
      <div className="flex flex-col ml-64">
        <Header className="bg-gray-100 w-full p-4 shadow fixed" />
        <div className="flex-1 p-6 bg-gray-50">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-4">{selectedComponent.charAt(0).toUpperCase() + selectedComponent.slice(1)}</h3>
                {/* Tambahkan konten dashboard di sini */}
                {renderContent()}
                {/* <PostList />
                <CategoryList />
                <RegionForm />
                <Editor /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;