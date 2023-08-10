import PropTypes from 'prop-types';
import React from "react";
//import "./Searchbar.scss";

const Searchbar = ({ searchbar }) => {
  const handleChange = (event) => {
    const value = event.target.value;
    searchbar(value);
  };

  return (
    <div className="Searchbar">
      <div>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Search students..."
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

Searchbar.propTypes = {
    searchbar: PropTypes.string.isRequired,
  
  };

export default Searchbar;