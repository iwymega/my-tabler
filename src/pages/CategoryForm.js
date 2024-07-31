import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Ganti useHistory dengan useNavigate
import { createCategory } from '../api/category'; // Pastikan Anda memiliki fungsi ini di category.js
import { Button } from '../components/Button'; // Ganti dengan library button yang Anda gunakan

const CategoryForm = () => {
  const [categoryName, setCategoryName] = useState('');
  const navigate = useNavigate(); // Ganti useHistory dengan useNavigate

  const handleInputChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCategory({ name: categoryName });
      navigate('/categories'); // Ganti history.push dengan navigate
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  return (
    <div>
      <h1>Add New Category</h1>
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
            <label class="form-label">Text</label>
            <input type="text" class="form-control" name="example-text-input" placeholder="Input placeholder" />
            </div>
            <div class="mb-3">
            <label class="form-label">Password</label>
            <input type="text" class="form-control" name="example-password-input" placeholder="Input placeholder" />
        </div>
        <div>
          <label htmlFor="categoryName">Category Name:</label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={handleInputChange}
            required
          />
        </div>
        <Button type="primary" htmlType="submit">Submit</Button>
      </form>
    </div>
  );
};

export default CategoryForm;