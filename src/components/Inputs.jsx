import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const Inputs = ({ setQuery, setUnits }) => {
  const [city, setCity] = useState("");

  const searchHandler = () => {
    if (city !== "") setQuery({ q: city });
  };

  const locationhandler = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setQuery({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        // setUnits('imperial');
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center my-6">
      <div className="flex flex-row-3/4 items-center justify-center space-x-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          className="text-blue-400 w-full p-2 focus shadow-xl focus:outline-none capitalize"
          placeholder="city name"
        />
        <FaSearch
          onClick={searchHandler}
          className="left-0 text-white text-xl transition ease-out hover:scale-125"
        />
        <FaLocationDot
          onClick={locationhandler}
          className="text-white cursor-progress transition ease-out hover:scale-125"
        />
      </div>
      <div className="flex pt-3 md:pt-0  md:w-1/4 md:items-center justify-center">
        <button
          onClick={() => setUnits("metric")}
          className="text-xl text-white font-thin"
          name="metric"
        >
          °C
        </button>
        <span className="text-white mx-1 font-extrabold"> |</span>
        <button
          onClick={() => setUnits("imperial")}
          className="text-xl text-white font-thin"
          name="imperial"
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default Inputs;
