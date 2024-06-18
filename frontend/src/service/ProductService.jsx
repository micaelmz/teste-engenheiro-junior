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
      quantity: 0,
      status: '',
      image: null,
      created_at: '',
      updated_at: ''
    }
  },

  async getData() {
    try {
      const response = await axios.get(ENDPOINT);
      return response.data.reverse();
    } catch (error) {
      console.error('Error fetching clients data:', error);
      throw error;
    }
  },

  async create(productObj, imageFile) {
    try {
      console.log(productObj);
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
      const response = await axios.put(`${ENDPOINT}/${productObj.id}`, productObj);
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  async delete(productId){
    try {
      const response = await axios.delete(`${ENDPOINT}/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  async search(query) {
    try {

      if (!query) {
        return this.getData();
      }

      const response = await axios.get(`${ENDPOINT}/search`, {
        params: {
          query: query
        }
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  },
}