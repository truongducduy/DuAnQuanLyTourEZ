import axios from "axios";

export const getTourBySlug = async (slugTour) => {
  const res = await axios.get(`http://localhost:8080/api/v1/tours/detail/${slugTour}`);
  return res.data;
};
