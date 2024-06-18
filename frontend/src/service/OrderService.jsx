import axios from "axios";

const ENDPOINT = 'http://localhost:8000/api/orders';

export const OrderService = {
  async getData() {
    try {
      const response = await axios.get(ENDPOINT);
      return response.data;
    } catch (error) {
      console.error('Error fetching clients data:', error);
      throw error;
    }
  },

  async create(orderObj) {
    try {
      const response = await axios.post(`${ENDPOINT}/`, orderObj);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  async update(orderObj) {
    try {
      console.log(orderObj);
      const response = await axios.put(`${ENDPOINT}/${orderObj.id}/`, orderObj);
      return response.data;
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  }
};