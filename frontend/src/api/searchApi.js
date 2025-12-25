import axiosClient from "./axiosClient";

export const searchTours = async (keyword, mode = "full") => {
  try {
    // Sử dụng params để axios tự động encode và ghép chuỗi query string
    const res = await axiosClient.get('/search/tours', {
      params: {
        keyword: keyword,
        mode: mode
      }
    });

    return res; 

  } catch (error) {
    console.error("Lỗi searchTours:", error);
    throw error;
  }
};