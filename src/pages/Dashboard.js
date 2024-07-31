import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import CategoryList from "./CategoryList";
import PostList from "./PostList";
import RegionForm from "../components/RegionForm";
import Editor from "../components/TeksEditor";

function Dashboard() {
  return (
    <div className="page">
      <div className="page-wrapper">
        <Header />
        <div className="page-body">
          <div className="container-xl">
            <div className="row row-deck row-cards">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Welcome to the Dashboard</h3>
                  </div>
                  <div className="card-body">
                    {/* Tambahkan konten dashboard di sini */}
                    {/* <CategoryList /> */}
                    <PostList />
                    {/* <RegionForm /> */}
                    {/* <Editor /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;