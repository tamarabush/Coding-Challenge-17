// src/Gallery.jsx
import React, { useEffect, useState } from "react";

const Gallery = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://course-api.com/react-tours-project");
      if (!response.ok) throw new Error("Error fetching tours");
      const data = await response.json();
      setTours(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  // Remove a tour
  const removeTour = (id) => {
    setTours(tours.filter((tour) => tour.id !== id));
  };

  // Toggle description visibility
  const toggleDescription = (id) => {
    setTours(
      tours.map((tour) =>
        tour.id === id ? { ...tour, showMore: !tour.showMore } : tour
      )
    );
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div className="gallery">
      {tours.map(({ id, name, price, info, image, showMore }) => (
        <div key={id} className="tour-card">
          <img src={image} alt={name} />
          <h3>{name}</h3>
          <p>${price}</p>
          <p>
            {showMore ? info : `${info.substring(0, 100)}...`}
            <button onClick={() => toggleDescription(id)}>
              {showMore ? "Show Less" : "Read More"}
            </button>
          </p>
          <button onClick={() => removeTour(id)}>Not Interested</button>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
