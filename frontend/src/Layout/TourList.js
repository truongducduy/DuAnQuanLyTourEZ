import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function TourList() {
    const { slugCategory } = useParams();
    const [newTours, setNewTours] = useState([]);
    const [categoryTitle, setCategoryTitle] = useState("");
    //   useEffect(() => {
    //     fetch("http://localhost:8080/api/v1/categories")
    //         .then(res => res.json())
    //         .then(data => setCategoryTitle(data))
    //         .catch(err => console.error(err));

    //     // Fetch Tours
    //     fetch(`http://localhost:8080/api/v1/tours/${slugCategory}`)
    //         .then(res => res.json())
    //         .then(data => setNewTours(data));
    // }, [slugCategory]);
    useEffect(() => {
        fetch("http://localhost:8080/api/v1/categories")
            .then(res => res.json())
            .then(data => {
                const cat = data.find(c => c.slug === slugCategory);
                setCategoryTitle(cat ? cat.title : "Không tìm thấy");
            })
            .catch(err => console.error(err));
    
        // Fetch tours
        fetch(`http://localhost:8080/api/v1/tours/${slugCategory}`)
            .then(res => res.json())
            .then(data => setNewTours(data));
    }, [slugCategory]);
    

    const TourCard = ({ slug, title, time, price, image }) => {
        return (
            <Link to={`/tour/${slug}`} className="tour-card col-4">
                <div className="card-image-wrapper">
                    <img src={image} alt={title} className="card-image" />
                </div>
                <div className="card-content">
                    <h3 className="card-title">{title}</h3>
                    <p className="card-duration">
                        {time}
                    </p>
                    <div className="card-footer">
                        <p className="card-price">{price.toLocaleString()}₫</p>
                        <button className="btn card-detail-btn">XEM NGAY</button>
                    </div>
                </div>
            </Link>
        );
    };
   
    return (
        < section className="tour-section">
        <div className="container">
            <h2 className="section-title"> Danh sách tour:  {categoryTitle || "Đang tải..."}</h2>

            <div className="px-4 sm:px-6 lg:px-8">
                <div className="items-center justify-items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {newTours.length > 0 ? (
                        newTours.map((tour) => (
                            <div className='flex-1 min-w-[250px] max-w-[300px] h-full border border-gray-700 rounded-xl overflow-hidden bg-tour-card' 
                            key={tour._id}>
                                <TourCard
                                    key={tour._id}
                                    slug={tour.slug} 
                                    title={tour.title}
                                    time={tour.duration || "Không rõ"}
                                    price={
                                        Number(tour.price || tour.priceAdult || 0)
                                    }
                                    image={
                                        tour.images ||
                                        "https://picsum.photos/350/200?random=99"
                                    }
                                />
                            </div>
                        ))
                    ) : (
                        <p>Đang tải dữ liệu...</p>
                    )}
                </div>
            </div>
        </div>
    </section>
    );
}
