export const OrderService = {
  getData() {
    return [
      {
        id: 1000,
        product_name: 'James Butt',
        date: '2015-09-13',
        status: 'Em aberto',
        client: {
          name: 'Ioni Bowcher',
          sex: 'm'
        },
        price: 7066323
      },
      {
        id: 1001,
        product_name: 'Josephine Darakjy',
        date: '2019-02-09',
        status: 'Pago',
        client: {
          name: 'Amy Elsner',
          sex: 'f'
        },
        price: 82429
      },
      {
        id: 1002,
        product_name: 'Art Venere',
        date: '2017-05-13',
        status: 'Cancelado',
        client: {
          name: 'Asiya Javayant',
          sex: 'f'
        },
        price: 9.99
      }
    ]
  },

  getAllClientsNameAndSex() {
    return Promise.resolve(this.getData().map(d => {
      return {
        name: d.client,
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