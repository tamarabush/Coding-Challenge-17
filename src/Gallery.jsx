import React, { useState, useEffect } from 'react';

function Gallery() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.allorigins.win/get?url=https://course-api.com/react-tours-project')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setTours(JSON.parse(data.contents));
        setLoading(false);
      })
      .catch(err => {
        setError(`Failed to fetch tours: ${err.message}`);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="gallery">
      {tours.map(tour => (
        <div key={tour.id} className="tour-card">
          <img src={tour.image} alt={tour.name} />
          <h3>{tour.name}</h3>
          <p>{tour.price}</p>
          <p>
            {tour.info.length > 100 ? `${tour.info.substring(0, 100)}...` : tour.info}
            {tour.info.length > 100 && (
              <button onClick={() => alert(tour.info)}>
                {tour.showMore ? 'Show Less' : 'Read More'}
              </button>
            )}
          </p>
          <button onClick={() => setTours(tours.filter(t => t.id !== tour.id))}>
            Not Interested
          </button>
        </div>
      ))}
    </div>
  );
}

export default Gallery;
