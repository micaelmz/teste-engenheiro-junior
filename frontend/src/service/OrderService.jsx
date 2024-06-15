export const OrderService = {
  getData() {
    return [
      {
        id: 1000,
        product_name: 'James Butt',
        date: '2015-09-13',
        status: 'Em aberto',
        representative: {
          name: 'Ioni Bowcher',
          image: 'ionibowcher.png'
        },
        price: 7066323
      },
      {
        id: 1001,
        product_name: 'Josephine Darakjy',
        date: '2019-02-09',
        status: 'Pago',
        representative: {
          name: 'Amy Elsner',
          image: 'amyelsner.png'
        },
        price: 82429
      },
      {
        id: 1002,
        product_name: 'Art Venere',
        date: '2017-05-13',
        status: 'Cancelado',
        representative: {
          name: 'Asiya Javayant',
          image: 'asiyajavayant.png'
        },
        price: 9.99
      }
    ]
  },

  getAllCustomersName() {
    return Promise.resolve(this.getData().map(item => item.client.name));
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