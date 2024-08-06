import React, { useState, useEffect, useCallback } from "react";
import { getPosts, createPost, updatePost, deletePost, storageimage, IMAGE_STORAGE } from "../api/post";
import { getCategories } from '../api/category'; // Import fungsi getCategories dari file api/category.js
import { Button } from '../components/Button';
import TeksEditor from '../components/TeksEditor';
import DataTable from 'react-data-table-component';
import { useDropzone } from 'react-dropzone';
import TinyMCEEditor from "../components/TinyMCEEditor";
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
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [imageCover, setImageCover] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [preview, setPreview] = useState(null);
  const [images, setImages] = useState([]);
  const [postIdToDelete, setPostIdToDelete] = useState(null);



  // const [isLoading, setIsLoading] = useState(false);

  // fungsi dropzone
  const onDrop = useCallback((acceptedFiles) => {
    setImageCover(acceptedFiles[0]);
  }, []);

  // const onDropGallery = (acceptedFiles) => {
  //   setGallery([...gallery, ...acceptedFiles]);
  // };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      const file = acceptedFiles[0];
      setImageCover(file);
      setPreview(URL.createObjectURL(file));
    }
  });


  // const { getRootProps: getRootPropsGallery, getInputProps: getInputPropsGallery } = useDropzone({
  //   onDrop: onDropGallery,
  //   accept: 'image/*',
  //   multiple: true,
  // });

  useEffect(() => {
    // const fetchImages = async () => {
    //   try {
    //     const images = await storageimage();
    //     setImages(images);
    //   } catch (error) {
    //     console.error("Error fetching images:", error);
    //   }
    // };

    // fetchImages();

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
    setShowLoading(true);
    const { title, content, category_id } = newPost;

    if (!title || !content || !category_id) {
      console.error("Missing required fields:", { title, content, category_id });
      setShowLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category_id', category_id);
    if (imageCover) {
      formData.append('image_cover', imageCover);
    }

    try {
      const response = await createPost(title, content, category_id, imageCover);
      console.log("Response from server:", response);

      setPosts(prevPosts => [...prevPosts, response]);
      setNewPost({ title: "", content: "", category_id: "" });
      setImageCover(null);
      setCreateModalOpen(false);
      fetchPosts(); // Uncomment this if you have a function to fetch posts
    } catch (error) {
      console.error("Error creating post:", error.response ? error.response.data : error.message);
    } finally {
      setShowLoading(false);
    }
  };

  const handleUpdatePost = async (id) => {
    setShowLoading(true);
    const formData = new FormData();
    formData.append('title', editPost.title);
    formData.append('content', editPost.content);
    formData.append('category_id', editPost.category_id);
    if (imageCover) {
      formData.append('image_cover', imageCover);
    }
    gallery.forEach((file, index) => {
      formData.append(`gallery[${index}]`, file);
    });

    try {
      const response = await updatePost(id, formData);
      setPosts(posts.map(post => (post.id === id ? response.data : post)));
      setEditPost(null);
      setImageCover(null);
      setGallery([]);
      setEditModalOpen(false);
      fetchPosts();
    } catch (error) {
      console.error("Error updating post:", error);
    } finally {
      setShowLoading(false);
    }
  };

  // const handleDeletePost = async () => {
  //   try {
  //     await deletePost(postToDelete);
  //     setPosts(posts.filter(post => post.id !== postToDelete));
  //     setConfirmModalOpen(false);
  //     setPostToDelete(null);
  //   } catch (error) {
  //     console.error("Error deleting post:", error);
  //   }
  // };

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);
      console.log('Post deleted successfully');
      // Lakukan sesuatu setelah berhasil menghapus, misalnya memperbarui daftar postingan
      setConfirmModalOpen(false);
    } catch (error) {
      console.error('Failed to delete post:', error);
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

  const filteredPosts = posts.filter(post => {
    const title = post.title ? post.title.toLowerCase() : '';
    const content = post.content ? stripHTML(post.content).toLowerCase() : '';
    const category = categories.find(cat => cat.id === post.category_id)?.name ? categories.find(cat => cat.id === post.category_id).name.toLowerCase() : '';
  
    return title.includes(searchText.toLowerCase()) ||
           content.includes(searchText.toLowerCase()) ||
           category.includes(searchText.toLowerCase());
  });

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
    <div className="container mx-auto p-4">
      <Button type="btn btn-outline-primary" onClick={() => setCreateModalOpen(true)}>Create Post</Button>
      <input 
        type="text" 
        placeholder="Search..." 
        value={searchText} 
        onChange={(e) => setSearchText(e.target.value)} 
        className="form-control mb-3"
      />
      <div className="table-responsive">
      <DataTable
          columns={[
            {
              name: 'Title',
              selector: row => row.title,
              sortable: true,
            },
            {
              name: 'Content',
              // gunakan stripHTML untuk menghilangkan tag HTML
              selector: row => stripHTML(row.content),
              // selector: row => row.content,
              sortable: true,
            },
            // tampilkan image_cover ini src dari backend https://simple-api.gotrasoft.com/storage/post/namafile.jpg
            {
              name: 'Image Cover',
              cell: row => (
                // <img src={row.image_cover} alt={row.title} className="h-10" />
                // <img src={`https://simple-api.gotrasoft.com/storage/post/${row.image_cover}`} alt={row.title} className="h-10" />
                <img src={`${IMAGE_STORAGE}${row.image_cover}`} alt={row.title} className="h-10" />
              ),
            },
            // {
            //   name: 'Image',
            //   cell: row => {
            //     const image = images.find(img => img.id === row.image_id);
            //     return image ? <img src={image.image_cover} alt={row.title} style={{ width: '50px', height: '50px' }} /> : 'No Image';
            //   },
            // },
            {
              name: 'Actions',
              cell: row => (
                <>
                  <Button type="warning" onClick={() => { setEditPost(row); setEditModalOpen(true); }}>Edit</Button>
                  {/* <Button type="danger" onClick={() => { setPostToDelete(row); setConfirmModalOpen(true); }}>Delete</Button> */}
                  <Button type="danger" onClick={() => { setPostIdToDelete(row.id); setConfirmModalOpen(true); }}>Delete</Button>

                </>
              ),
            },
          ]}
          // data={posts.filter(post => post.title.includes(searchText))}
          data={posts.filter(post => post.title && post.title.includes(searchText))}
          pagination
          highlightOnHover
          selectableRows
          expandableRows
          expandableRowsComponent={({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>}
        />
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
                <TeksEditor 
                  value={newPost.content}
                  onEditorChange={(content) => setNewPost({ ...newPost, content })}
                />
              </div>
              {/* <div className="form-group">
                <label className="form-label">Content TinyMCEEditor</label>
                <TinyMCEEditor 
                  value={newPost.content}
                  onEditorChange={(content) => setNewPost({ ...newPost, content })}
                />
              </div> */}
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  className="form-control"
                  value={newPost.category_id}
                  onChange={(e) => setNewPost({ ...newPost, category_id: e.target.value })}
                  required
                >
                  <option value="">Select Category</option>
                  {categories && categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

                {/* dropzone */}
                <div className="form-group p-4">
                  {/* <div {...getRootPropsImageCover()} className="dropzone border-2 border-dashed border-blue-500 rounded-md p-4 text-center cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100">
                    <input {...getInputPropsImageCover()} />
                    {imageCover ? (
                      <p className="text-blue-500">{imageCover.name}</p>
                    ) : (
                      <p className="text-blue-500">Drag 'n' drop an image here, or click to select one</p>
                    )}
                  </div> */}
                  <div {...getRootProps()} className="dropzone border-2 border-dashed border-blue-500 rounded-md p-4 text-center cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100">
                    <input {...getInputProps()} />
                    <p className="text-blue-500">Drag 'n' drop some files here, or click to select files</p>
                  </div>
                  {preview && <img src={preview} alt="Preview" className="mt-4 border-2 border-grey-500 rounded-md w-50 h-auto" />}
                  {imageCover && <p>Selected file: {imageCover.name}</p>}

                  {/* <div {...getRootPropsGallery()} className="dropzone border-2 border-dashed border-blue-500 rounded-md p-4 text-center cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100 mt-4">
                    <input {...getInputPropsGallery()} />
                    {gallery.length > 0 ? (
                      <div className="file-list mt-2">
                        {gallery.map((file, index) => (
                          <p key={index} className="text-gray-700">{file.name}</p>
                        ))}
                      </div>
                    ) : (
                      <p className="text-blue-500">Drag 'n' drop images here, or click to select multiple</p>
                    )}
                  </div> */}
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
              <div className="form-group p-4">
                  <div {...getRootProps()} className="dropzone border-2 border-dashed border-blue-500 rounded-md p-4 text-center cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100">
                    <input {...getInputProps()} />
                    <p className="text-blue-500">Drag 'n' drop some files here, or click to select files</p>
                  </div>
                  {/* jika ada gambar tampilkan <img src={`${IMAGE_STORAGE}${editPost.image_cover}`} alt={editPost.title} className="mt-4 border-2 border-grey-500 rounded-md w-50 h-auto" /> jika tidak {preview && <img src={preview} alt="Preview" className="mt-4 border-2 border-grey-500 rounded-md w-50 h-auto" />}*/}

                  {preview && <img src={preview} alt="Preview" className="mt-4 border-2 border-grey-500 rounded-md w-50 h-auto" />}
                  {imageCover && <p>Selected file: {imageCover.name}</p>}
                  

                  <img src={`${IMAGE_STORAGE}${editPost.image_cover}`} alt={editPost.title} className="mt-4 border-2 border-grey-500 rounded-md w-50 h-auto" />
                {/* <img src={`${IMAGE_STORAGE}${row.image_cover}`} alt={row.title} className="h-10" /> */}
                  

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
                {/* <button className="btn btn-danger" onClick={handleDeletePost}>Delete</button> */}
                {/* <button className="btn btn-danger" onClick={() => handleDeletePost(posts.id)}>Delete Post</button> */}
                <button className="btn btn-danger" onClick={() => handleDeletePost(postIdToDelete)}>Delete Post</button>
              </div>
            </div>
          </div>
        </div>
      )}
  </div>
  );
}

export default PostList;