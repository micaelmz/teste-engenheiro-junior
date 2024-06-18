import axios from "axios";

const ENDPOINT = 'http://localhost:8000/api';

export const HomeService = {

  async getTotalClients() {
    try {
      const response = await axios.get(`${ENDPOINT}/clients/total`);
      return response.data.total;
    } catch (error) {
      console.error('Error fetching total clients:', error);
      throw error;
    }
  },

  async getTotalProducts() {
    try {
      const response = await axios.get(`${ENDPOINT}/products/total`);
      return response.data.total;
    } catch (error) {
      console.error('Error fetching total clients:', error);
      throw error;
    }
  },

  async getTotalSales() {
    try {
      const response = await axios.get(`${ENDPOINT}/orders/total/price`);
      return response.data;
    } catch (error) {
      console.error('Error fetching total sales price:', error);
      throw error;
    }
  },

  async getLastSales() {
    try {
      const response = await axios.get(`${ENDPOINT}/orders/tail/4`);
      return response.data;
    } catch (error) {
      console.error('Error fetching total sales price:', error);
      throw error;
    }
  },

  async getWeeksales() {
    try {
      const response = await axios.get(`${ENDPOINT}/orders/weeksales`);
      return response.data;
    } catch (error) {
      console.error('Error fetching weeksales:', error);
      throw error;
    }
  },

  sumTotalWeekSales(weeksales) {
    let total = 0;
    weeksales.map(dayData => {
          total += dayData.paid + dayData.canceled + dayData.pending;
        }
    );
    return total;
  }
};