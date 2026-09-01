/**
 * API endpoint paths, relative to BASE_URL, for API-level tests.
 */
module.exports = {
  orders: {
    list: '/orders', // GET  - list orders
    create: '/orders', // POST - create an order
    getById: (id) => `/orders/${id}`, // GET  - fetch a single order
  },
};
