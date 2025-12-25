import axiosClient from "./axiosClient";

const checkoutApi = {
  // Get cart data to display on Checkout page
  getCheckoutData: () => {
    return axiosClient.get("/checkout");
  },

  // Place order
  // Body: { userInfor: { fullName, phone, email, note, voucherCode } }
  placeOrder: (data) => {
    return axiosClient.post("/checkout/order", data);
  },

  // Create VNPay payment (if needed)
  createPayment: (orderId) => {
    return axiosClient.post(`/checkout/payment/${orderId}`);
  },

  // Cancel order
  cancelOrder: (orderId, reasonData) => {
      return axiosClient.patch(`/checkout/cancel/${orderId}`, reasonData);
  }
};

export default checkoutApi;