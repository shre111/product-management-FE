

import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

class ProductService {
  async getProducts() {
    try {
      const response = await axios.get(`${API_URL}/products`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async addProduct(product) {
    try {
      const response = await axios.post(`${API_URL}/product`, product);
      return response.data;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  }

  async updateProduct(id, product) {
    try {
      const response = await axios.put(`${API_URL}/products/${id}`, product);
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const response = await axios.delete(`${API_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
}

export default new ProductService();
