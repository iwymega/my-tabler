import React, { useState, useEffect } from "react";
import { getPosts, createPost, updatePost, deletePost } from "../api/post";
import { getCategories } from '../api/category'; // Import fungsi getCategories dari file api/category.js
import { Button } from '../components/Button';
import TeksEditor from '../components/TeksEditor';


/**
 * Renders a list of posts with create, edit, and delete functionality.
 *
 * @returns {JSX.Element} The rendered PostList component.
 */
function PostList() {
  const [showLoading, setShowLoading] = useState(false);

  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "", category_id: "" });
  const [editPost, setEditPost] = useState(null);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    fetchPosts();
    getCategories().then(response => {
      setCategories(response.data);
    }).catch(error => {
      console.error('Error fetching categories:', error);
    });
  }, []);

  const stripHTML = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  const fetchPosts = async () => {
    try {
      const response = await getPosts();
      const strippedPosts = response.data.map(post => ({
        ...post,
        content: stripHTML(post.content)
      }));
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleCreatePost = async () => {
    // setIsLoading(true); // Tambahkan ini untuk menampilkan loading spinner
    setShowLoading(true);
    try {
      const response = await createPost(newPost.title, newPost.content, newPost.category_id);
      setPosts([...posts, response.data]);
      setNewPost({ title: "", content: "", category_id: "" });
      setCreateModalOpen(false);
      fetchPosts();
      // panggil fungsi loadingkondisi true
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      // setIsLoading(false); // Tambahkan ini untuk menyembunyikan loading spinner
      setShowLoading(false);
    }
  };

  const handleUpdatePost = async (id) => {
    try {
      const response = await updatePost(id, editPost.title, editPost.content, editPost.category_id);
      setPosts(posts.map(post => (post.id === id ? response.data : post)));
      setEditPost(null);
      setEditModalOpen(false);
      fetchPosts();
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDeletePost = async () => {
    try {
      await deletePost(postToDelete);
      setPosts(posts.filter(post => post.id !== postToDelete));
      setConfirmModalOpen(false);
      setPostToDelete(null);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  /**
   * Sets the post ID to be deleted and opens the confirm modal.
   * @param {number} id - The ID of the post to be deleted.
   * @returns {void}
   */
  // buat doc dalam bahsa indonesia
  // Fungsi ini menampilkan modal konfirmasi untuk menghapus post
  // @param {number} id - ID dari post yang akan dihapus
  // @returns {void}

  const showConfirmModal = (id) => {
    setPostToDelete(id);
    setConfirmModalOpen(true);
  };

  // jika showLoading maka muncul loader
  if (showLoading) {
    return (
      // buat halaman full dengan loading dari tabler/bootstrap, berisi spiner warna biru, tulisan loading ...
      <div className="page">
        <div className="page-single">
          <div className="container">
            <div className="row">
              <div className="card">
                <div className="card-body text-center">
                <img src="https://cdn.dribbble.com/users/2442115/screenshots/8699490/dec-01-2019_19-16-16.gif" className="h-6" alt="React Logo" />
                <h1>Loading<span className="animated-dots"></span></h1>
                </div>
              </div>  
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container">
    <Button type="btn btn-outline-primary" onClick={() => setCreateModalOpen(true)}>Create Post</Button>
    {/* <button className="btn btn-primary" onClick={() => setCreateModalOpen(true)}>Create Post</button> */}
    <div className="card mt-4">
      <div className="card-header">
        <h2>Posts List</h2>
      </div>
      <div className="card-body">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Content</th>
              <th>Actions</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                {/* <td>{post.content}</td> */}
                {/* render html dari post.content */}
                {/* <td dangerouslySetInnerHTML={{ __html: post.content }}></td> */}
                {/* hapus semua tag html dari post.content */}
                {/* <td>{stripHTML(post.content)}</td> */}
                {/* hapus semua tag html dari post.content dan batasi 100 karakter */}
                <td>{stripHTML(post.content).substring(0, 100)}...</td>

                <td>{categories.find(cat => cat.id === post.category_id)?.name}</td>
                <td>
                  {/* <Button type="warning" onClick={() => { setEditPost(post); setEditModalOpen(true); }}>Edit</Button> */}
                  {/* <button className="btn btn-secondary mr-2" onClick={() => { setEditPost(post); setEditModalOpen(true); }}>Edit</button> */}
                  {/* <Button type="danger" onClick={() => showConfirmModal(post.id)}>Delete</Button> */}
                  {/* <button className="btn btn-danger" onClick={() => handleDeletePost(post.id)}>Delete</button> */}
                  
                  <Button type="warning" onClick={() => { setEditPost(post); setEditModalOpen(true); }}>Edit</Button>
                  <Button type="danger" onClick={() => showConfirmModal(post.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {isCreateModalOpen && (
      <div className="modal d-block">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create Post</h5>
              <button type="button" className="close" onClick={() => setCreateModalOpen(false)}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Title"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Content</label>
                {/* panggil komponen editor */}
                <TeksEditor 
                  value={newPost.content}
                  // onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  onEditorChange={(content) => setNewPost({ ...newPost, content })}
                  // onEditorChange={(content) => setNewPost({ ...newPost, content })}

                />
                {/* <textarea
                  className="form-control"
                  placeholder="Content"
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  required
                /> */}
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  className="form-control"
                  value={newPost.category_id}
                  onChange={(e) => setNewPost({ ...newPost, category_id: e.target.value })}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setCreateModalOpen(false)}>Close</button>
              <button className="btn btn-primary" onClick={handleCreatePost}>Create</button>
            </div>
          </div>
        </div>
      </div>
    )}

    {isEditModalOpen && editPost && (
      <div className="modal d-block">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Post</h5>
              <button type="button" className="close" onClick={() => setEditModalOpen(false)}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Title"
                  value={editPost.title}
                  onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Content</label>
                <TeksEditor 
                  value={editPost.content}
                  onEditorChange={(content) => setEditPost({ ...editPost, content })}
                />
                {/* <textarea
                  className="form-control"
                  placeholder="Content"
                  value={editPost.content}
                  onChange={(e) => setEditPost({ ...editPost, content: e.target.value })}
                /> */}
              </div>
              <div className="form-group">
                <label className="form-label">Category Name</label>
                <select
                  className="form-control"
                  value={editPost.category_id}
                  onChange={(e) => setEditPost({ ...editPost, category_id: e.target.value })}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setEditModalOpen(false)}>Close</button>
              <button className="btn btn-primary" onClick={() => handleUpdatePost(editPost.id)}>Update</button>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Modal untuk konfirmasi delete */}
    {isConfirmModalOpen && (
        <div className="modal modal-blur fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="close" onClick={() => setConfirmModalOpen(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this post?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setConfirmModalOpen(false)}>Cancel</button>
                <button className="btn btn-danger" onClick={handleDeletePost}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
  </div>
  );
}

export default PostList;