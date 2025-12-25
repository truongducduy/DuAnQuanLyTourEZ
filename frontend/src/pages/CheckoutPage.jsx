import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import checkoutApi from "../api/checkoutApi"; // Updated import
import { FaCalendarAlt, FaTicketAlt, FaMoneyBillWave, FaCreditCard } from "react-icons/fa";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);


  const [userInfor, setUserInfor] = useState({
    fullName: "",
    phone: "",
    email: "",
    note: "",
    voucherCode: ""
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const res = await checkoutApi.getCheckoutData();
        
       
        if (res.code === 400) {
          alert(res.message);
          navigate("/"); 
        } else {
          
          setCartData(res); 
         
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
              const user = JSON.parse(storedUser);
              setUserInfor(prev => ({
                  ...prev,
                  fullName: user.fullName || "",
                  email: user.email || "",
                  phone: user.phone || ""
              }));
          }
        }
      } catch (error) {
        console.error("Error loading checkout:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfor({ ...userInfor, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const res = await checkoutApi.placeOrder({ userInfor });
      
      if (res.status === "200" || res.code === 200) { 
        alert("Order placed successfully! Check your email.");
        
        
        navigate("/"); 
      } else {
        alert("Error: " + res.message);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while placing the order.");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <div className="text-white text-center mt-20 text-xl">Loading checkout info...</div>;
  
  if (!cartData || !cartData.tours || cartData.tours.length === 0) {
    return (
        <div className="min-h-screen bg-[#0e1217] flex flex-col items-center justify-center text-white">
            <h2 className="text-2xl mb-4">Cart is empty!</h2>
            <button onClick={() => navigate("/")} className="text-green-400 hover:underline">Back to Home</button>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0e1217] text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center uppercase text-green-400">Confirm Booking</h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN: TOUR LIST */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#1a1f25] p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-bold mb-4 border-b border-gray-600 pb-2">Tour List</h3>
              
              {cartData.tours.map((tourItem, index) => (
                <div key={index} className="mb-6 last:mb-0 pb-6 border-b border-gray-800 last:border-0">
                  <div className="flex gap-4">
                    <img 
                      src={tourItem.tourInfo.images?.[0] || "/no-image.jpg"} 
                      alt={tourItem.tourInfo.title}
                      className="w-24 h-24 object-cover rounded-lg border border-gray-600"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-lg text-green-400 line-clamp-2">{tourItem.tourInfo.title}</h4>
                      <p className="text-sm text-gray-400">Code: {tourItem.tourInfo.code}</p>
                      
                      {/* List departure times for this tour */}
                      <div className="mt-2 space-y-2">
                          {tourItem.timeStarts.map((ts, idx) => (
                              <div key={idx} className="bg-[#121212] p-3 rounded flex flex-wrap justify-between items-center text-sm gap-2">
                                  <div className="flex items-center gap-2">
                                      <FaCalendarAlt className="text-gray-500"/>
                                      <span>{new Date(ts.timeDepart).toLocaleDateString('vi-VN')}</span>
                                  </div>
                                  <div className="flex items-center gap-4">
                                      <span className="flex items-center gap-1 text-gray-300"><FaTicketAlt className="text-yellow-500"/> x{ts.quantity}</span>
                                      <span className="font-bold text-green-400">{ts.totalPrice.toLocaleString()}₫</span>
                                  </div>
                              </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: INFORMATION FORM */}
          <div className="lg:col-span-5">
            <div className="bg-[#1a1f25] p-6 rounded-xl border border-gray-700 sticky top-24">
              <h3 className="text-xl font-bold mb-4 text-green-400 uppercase">Contact Information</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm mb-1 text-gray-300">Full Name (*)</label>
                  <input 
                    name="fullName" required 
                    value={userInfor.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-[#121212] border border-gray-600 rounded p-3 focus:border-green-500 outline-none transition text-white"
                    placeholder="Enter full name..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1 text-gray-300">Phone (*)</label>
                    <input 
                      name="phone" required 
                      value={userInfor.phone}
                      onChange={handleInputChange}
                      className="w-full bg-[#121212] border border-gray-600 rounded p-3 focus:border-green-500 outline-none transition text-white"
                      placeholder="09xx..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1 text-gray-300">Email (*)</label>
                    <input 
                      name="email" type="email" required 
                      value={userInfor.email}
                      onChange={handleInputChange}
                      className="w-full bg-[#121212] border border-gray-600 rounded p-3 focus:border-green-500 outline-none transition text-white"
                      placeholder="email@..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-1 text-gray-300">Note</label>
                  <textarea 
                    name="note" rows="3"
                    value={userInfor.note}
                    onChange={handleInputChange}
                    className="w-full bg-[#121212] border border-gray-600 rounded p-3 focus:border-green-500 outline-none transition text-white"
                    placeholder="Special requests..."
                  ></textarea>
                </div>

                {/* VOUCHER */}
                <div className="pt-4 border-t border-gray-700">
                  <label className="block text-sm mb-1 text-yellow-400 flex items-center gap-2">
                    <FaTicketAlt /> Discount Code
                  </label>
                  <input 
                    name="voucherCode"
                    value={userInfor.voucherCode}
                    onChange={handleInputChange}
                    className="w-full bg-[#121212] border border-dashed border-yellow-600 rounded p-3 text-yellow-400 focus:border-yellow-400 outline-none transition placeholder-gray-600"
                    placeholder="Enter voucher code (if any)"
                  />
                </div>

                {/* TOTAL */}
                <div className="pt-4 border-t border-gray-700 flex justify-between items-center">
                  <span className="text-gray-300 text-lg">Total Payment:</span>
                  <span className="text-2xl font-bold text-green-400">
                    {cartData.totalPrice.toLocaleString()}₫
                  </span>
                </div>

                <button 
                  type="submit" 
                  disabled={processing}
                  className={`w-full font-bold py-4 rounded-lg mt-4 transition transform hover:scale-[1.02] shadow-lg shadow-green-900/50 flex justify-center items-center gap-2
                    ${processing ? "bg-gray-600 cursor-not-allowed text-gray-300" : "bg-green-600 hover:bg-green-500 text-white"}`}
                >
                  {processing ? "Processing..." : <><FaMoneyBillWave /> CONFIRM ORDER</>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;