import React, { useState, useEffect } from 'react';

const Gallery = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // The function to fetch tours
  const fetchTours = async () => {
    setLoading(true);
    try {
      // Use CORS proxy to bypass the CORS issue
      const response = await fetch("https://cors-anywhere.herokuapp.com/https://course-api.com/react-tours-project");
      
      // Check if the response is ok (status code 200-299)
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setTours(data);  // Set the fetched tours
    } catch (err) {
      setError(`Failed to fetch tours: ${err.message}`);  // Handle the error
    } finally {
      setLoading(false);  // Set loading to false after fetch completes
    }
  };

  // Fetch tours when the component mounts
  useEffect(() => {
    fetchTours();
  }, []);

  if (loading) {
    return <div>Loading...</div>;  // Show loading message
  }

  if (error) {
    return <div>{error}</div>;  // Show error message
  }

  return (
    <div className="gallery">
      {tours.map((tour) => (
        <div key={tour.id} className="tour-card">
          <img src={tour.image} alt={tour.name} />
          <h3>{tour.name}</h3>
          <p>{tour.price}</p>
          <p>{tour.info}</p>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
