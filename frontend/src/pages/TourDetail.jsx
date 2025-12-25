import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTourBySlug } from "../api/tourApi";

export const TourDetail = () => {
  const { slugTour } = useParams();

  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const data = await getTourBySlug(slugTour);

        if (!data) {
          setError("Không tìm thấy tour!");
          return;
        }

        setTour(data);
      } catch (err) {
        setError("Không thể load tour!");
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [slugTour]);

  // LOADING
  if (loading) {
    return (
      <div className="w-full text-center mt-20 text-white">Loading...</div>
    );
  }

  // ERROR
  if (error || !tour) {
    return <div className="w-full text-center mt-20 text-red-400">{error}</div>;
  }

  return (
    <div className="w-full bg-[#0e1217] text-white p-6">
      {/* TITLE */}
      <h1 className="text-5xl font-bold mb-6">
        {tour.title || "Không có tiêu đề"}
      </h1>

      {/* GALLERY */}
      <div className="grid grid-cols-4 gap-4 mb-10">
        {tour.images?.length > 0 ? (
          tour.images.map((img, index) => (
            <div
              key={index}
              className="w-full h-40 bg-cover bg-center rounded-xl border border-gray-700"
              style={{ backgroundImage: `url(${img})` }}
            ></div>
          ))
        ) : (
          <p className="col-span-4 text-gray-400">Không có hình ảnh</p>
        )}
      </div>

      <div className="grid grid-cols-12 gap-10">
        {/* LEFT CONTENT */}
        <div className="col-span-4 space-y-8">
          {/* DESCRIPTION */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Mô tả</h2>
            <p className="text-gray-300">
              {tour.information || "Chưa có mô tả cho tour này."}
            </p>
          </div>

          {/* BAO GỒM / KHÔNG BAO GỒM
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#13181f] p-5 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">Bao gồm</h3>
              <ul className="space-y-2 text-gray-300">
                {tour.include?.length > 0 ? (
                  tour.include.map((item, i) => <li key={i}>✔ {item}</li>)
                ) : (
                  <li className="text-gray-500">Không có dữ liệu</li>
                )}
              </ul>
            </div>

            Không Bao gồm
            <div className="bg-[#13181f] p-5 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">Không bao gồm</h3>
              <ul className="space-y-2 text-gray-300">
                {tour.exclude?.length > 0 ? (
                  tour.exclude.map((item, i) => <li key={i}>✘ {item}</li>)
                ) : (
                  <li className="text-gray-500">Không có dữ liệu</li>
                )}
              </ul>
            </div> */}
          {/* </div> */}

          {/* LỊCH TRÌNH */}
          {/* <div className="bg-[#13181f] p-5 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Lịch trình</h3>

            {tour.schedule?.length > 0 ? (
              tour.schedule.map((day, index) => (
                <div
                  key={index}
                  className="border border-gray-600 rounded-xl p-4 mb-3"
                >
                  <h4 className="text-lg font-semibold mb-2">{day.title}</h4>
                  <p className="text-gray-300">{day.content}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Chưa có lịch trình.</p>
            )}
          </div> */}
        </div>
        {/* RIGHT CONTENT */}
        <div className="col-span-4">
          <div className="bg-[#1a1f25] p-6 rounded-xl space-y-4">
            <h3 className="text-xl font-bold mb-3">Thông tin Tour</h3>

            <div className="flex justify-between text-gray-300">
              <span>Giá gốc:</span>
              <span>
                {tour.price ? tour.price.toLocaleString() : "Không có dữ liệu"}{" "}
                VND
              </span>
            </div>

            <div className="flex justify-between text-yellow-400 font-bold">
              <span>Giá giảm:</span>
              <span>
                {tour.price_special
                  ? tour.price_special.toLocaleString()
                  : "Không có"}{" "}
                VND
              </span>
            </div>

            <div className="flex justify-between text-gray-300">
              <span>Giảm giá:</span>
              <span>{tour.discount ? `${tour.discount}%` : "0%"}</span>
            </div>

            <button className="w-full bg-green-600 text-white py-2 rounded-lg font-bold">
              Đặt ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
