//TASK 1 - Create App.jsx

import "./App.css"; //import CSS for styling the App component
import React from "react"; //import React library
import Gallery from "./Gallery"; //import the Gallery component

//Define the App component as a functional component
const App = () => {
  return (
    <div className="App">
      <Gallery />
    </div>
  );
};

export default App;
