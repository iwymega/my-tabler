import React, { useState, useEffect } from "react";
import { getCategories, createCategory, updateCategory, deleteCategory } from '../api/category';
import { Table, Card, Modal, Form, Input } from '@tabler/core'; // Pastikan impor dari Tabler
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';

function CategoryList() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      const categories = response.data;
      setCategories(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fungsi untuk membuka modal
  const showModal = (category = null) => {
    setCurrentCategory(category);
    setIsModalVisible(true);
  };

  // Fungsi untuk menutup modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentCategory(null);
  };

  // Fungsi untuk submit form
  const handleOk = async (event) => {
    event.preventDefault();
    const categoryName = event.target.categoryName.value;

    try {
      if (currentCategory) {
        // Update existing category
        const response = await updateCategory(currentCategory.id, categoryName);
        const updatedCategory = response.data;
        setCategories(categories.map(cat => cat.id === updatedCategory.id ? updatedCategory : cat));
      } else {
        // Create new category
        const response = await createCategory(categoryName);
        const newCategory = response.data;
        setCategories([...categories, newCategory]);
      }
      setIsModalVisible(false);
      setCurrentCategory(null);
      fetchCategories();
    } catch (error) {
      console.error('There was a problem creating the category:', error);
    }
  };

  // fungsi untuk menghapus kategori
  // const handleDelete = async (id) => {
  //   try {
  //     await deleteCategory(id);
  //     setCategories(categories.filter(cat => cat.id !== id));
  //   } catch (error) {
  //     console.error('There was a problem deleting the category:', error);
  //   }
  // };
  const showConfirmModal = (categoryId) => {
    setCategoryToDelete(categoryId);
    setIsConfirmModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteCategory(categoryToDelete);
      setCategories(categories.filter(category => category.id !== categoryToDelete));
      setIsConfirmModalVisible(false);
      setCategoryToDelete(null);
    } catch (error) {
      console.error('There was a problem deleting the category:', error);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmModalVisible(false);
    setCategoryToDelete(null);
  };

  return (
    <div>
      <h1>Category List</h1>
      {/* <Button type="primary" onClick={showModal}>Add New Category</Button> */}
      <Button type="primary" onClick={() => showModal()}>Add New Category</Button>
      <div className="card">
      <div className="card-body">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>
                  {/* buat tombol edit dan delete dari componen button */}
                    {/* <Button type="warning">Edit</Button> */}
                    <Button type="warning" onClick={() => showModal(category)}>Edit</Button>
                    {/* buat tombol berfungsi delete */}
                    <Button type="danger" onClick={() => showConfirmModal(category.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal untuk form tambah kategori */}
      {isModalVisible && (
        <div className="modal modal-blur fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{currentCategory ? 'Edit Category' : 'Add New Category'}</h5>
                <button type="button" className="btn-close" onClick={handleCancel}></button>
              </div>
              <form onSubmit={handleOk}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Category Name</label>
                    <input defaultValue={currentCategory ? currentCategory.name : ''} required type="text" className="form-control" name="categoryName" />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCancel}>Close</button>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {isConfirmModalVisible && (
        <div className="modal modal-blur fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="close" onClick={handleCancelDelete}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this category?</p>
              </div>
              <div className="modal-footer">
                <Button type="button" className="btn btn-secondary" onClick={handleCancelDelete}>Cancel</Button>
                <Button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>Delete</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

    </div>
  );
}

export default CategoryList;