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

  getAllClientsNameAndSex() {
    return Promise.resolve(this.getData().map(d => {
      return {
        name: d.client.name,
        sex: d.client.sex
      };
    }));
  },

  getCustomersSmall() {
    return Promise.resolve(this.getData().slice(0, 10));
  },

  getCustomersMedium() {
    return Promise.resolve(this.getData().slice(0, 50));
  },

  getCustomersLarge() {
    return Promise.resolve(this.getData().slice(0, 200));
  },

  getCustomersXLarge() {
    return Promise.resolve(this.getData());
  }
};