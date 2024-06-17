import axios from 'axios';

const ENDPOINT = 'http://127.0.0.1:8000/api/products';

export const ProductService = {
  getBaseObject(){
    return {
      id: 0,
      name: '',
      category: '',
      description: '',
      price: 0,
      sku: '',
      stock_quantity: 0,
      status: '',
      image: null,
      created_at: '',
      updated_at: ''
    }
  },

  async getData() {
    try {
      const response = await axios.get(ENDPOINT);
      return response.data;
    } catch (error) {
      console.error('Error fetching clients data:', error);
      throw error;
    }
  },

  async create(productObj, imageFile) {
    try {
      const formData = new FormData();

      Object.keys(productObj).forEach(key => {
        formData.append(key, productObj[key]);
      });

      if (imageFile) {
        formData.append('image', imageFile);
      }

      const response = await axios.post(`${ENDPOINT}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  async update(productObj, imageFile) {
    try {
      const formData = new FormData();

      Object.keys(productObj).forEach(key => {
        formData.append(key, productObj[key]);
      });

      if (imageFile) {
        formData.append('image', imageFile);
      }

      const response = await axios.put(`${ENDPOINT}/${productObj.id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(productObj);
      return response.request;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },



}