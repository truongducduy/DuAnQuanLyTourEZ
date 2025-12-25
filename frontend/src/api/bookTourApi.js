import axiosClient from "./axiosClient";

export const bookTour = async (slugTour, bookingData) => {
  try {
    const res = await axiosClient.post(`/tours/${slugTour}/book`, bookingData);
    return res.data;
  } catch (error) {
    console.error("Lỗi bookTour:", error);
    throw error;
  }
};
