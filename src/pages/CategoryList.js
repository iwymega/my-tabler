import React, { useState, useEffect } from "react";
import { getCategories, createCategory, updateCategory, deleteCategory } from '../api/category';
import { Table, Card, Modal, Form, Input } from '@tabler/core'; // Pastikan impor dari Tabler
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import DataTable from "react-data-table-component";

function CategoryList() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  const filteredCategories = categories.filter(category =>
    category.name && category.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // useEffect(() => {
  //   fetchCategories();
  // }, []);

  // const fetchCategories = async () => {
  //   try {
  //     const response = await getCategories();
  //     const categories = response.data;
  //     setCategories(categories);
  //   } catch (error) {
  //     console.error('Error fetching categories:', error);
  //   }
  // };

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchCategories();
  }, []);

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

  const columns = [
    {
      name: 'No',
      selector: (row, index) => index + 1,
      sortable: false,
    },
    {
      name: 'Category Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <>
          <Button type="warning" onClick={() => { setCurrentCategory(row); setIsModalVisible(true); }}>Edit</Button>
          <Button type="danger" onClick={() => deleteCategory(row.id)}>Delete</Button>
        </>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="page">
        <div className="page-single">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <p>Loading...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Button className="btn btn-outline-primary mb-4" onClick={() => setIsModalVisible(true)}>Add New Category</Button>
      {/* <h2 className="text-2xl font-bold mb-4">Category List</h2> */}
      
      <div className="border border-gray-300 rounded">
        <DataTable
          columns={columns}
          data={filteredCategories}
          pagination
          fixedHeader
          highlightOnHover
          responsive
          subHeader
          subHeaderComponent={
            <input
              type="text"
              placeholder="Search Categories"
              className="form-control"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
          }
        />
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
  );
}

export default CategoryList;