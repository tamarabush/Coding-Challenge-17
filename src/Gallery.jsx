// Importing necessary hooks from React
import React, { useState, useEffect } from 'react';


// Defining the Gallery functional component
function Gallery() {
  // Using useState hook to create state variables for managing tours, loading status, and errors
  const [tours, setTours] = useState([]);  // Stores the list of tours
  const [loading, setLoading] = useState(true);  // Tracks if the data is still loading
  const [error, setError] = useState(null);  // Stores error messages if fetching fails


  // useEffect hook runs the fetch operation after the component mounts
  useEffect(() => {
    fetch('https://api.allorigins.win/get?url=https://course-api.com/react-tours-project')
      .then(response => response.json())  // Parses the response as JSON
      .then(data => {
        setTours(JSON.parse(data.contents));  // Extracts and sets tours data from the API response
        setLoading(false);  // Sets loading to false after data is fetched
      })
      .catch(err => {
        setError(`Failed to fetch tours: ${err.message}`);  // Sets error if fetch fails
        setLoading(false);  // Stops the loading indicator
      });
  }, []);  // Empty dependency array ensures this effect runs only once after the component is mounted

  // Conditional rendering: show loading message or error message if applicable
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  
  // Rendering the gallery of tours
  return (
    <div className="gallery">
      {tours.map(tour => (  // Iterating over each tour in the tours array
        <div key={tour.id} className="tour-card">  
          <img src={tour.image} alt={tour.name} />  
          <h3>{tour.name}</h3> 
          <p>{tour.price}</p>  
          <p>
            {tour.info.length > 100   
              ? `${tour.info.substring(0, 100)}...`  // Trimming info if it's too long
              : tour.info}  // Display full info if it's within the limit
            {tour.info.length > 100 && (  // Conditional "Read More" button if info is long
              <button onClick={() => alert(tour.info)}>
                Read More
              </button>
            )}
          </p>
          <button onClick={() => setTours(tours.filter(t => t.id !== tour.id))}>  
            {/* Removes tour from the list when "Not Interested" button is clicked */}
            Not Interested
          </button>
        </div>
      ))}
    </div>
  );
}

export default Gallery;  // Exporting the Gallery component to be used in other parts of the app

