import React from "react";

const WeatherForcast = ({ title, data }) => {
  return (
    <div>
      <div className="flex items-center justify-start mt-6 text-white">
        <p className="font-medium uppercase">{title}</p>
      </div>
      <hr className="my-1" />
      <div className="flex items-center justify-between">
        {data.map((d, id) => {
          return(
            <div key={id} className="flex flex-col items-center justify-center text-white">
            <p>{d.title}</p>
            <img className="w-12 my-1" src={d.icon} alt="weather icon" />
            <p>{`${d.temp.toFixed()}°`}</p>
          </div>
          )
          
        })}
      </div>
    </div>
  );
};

export default WeatherForcast;
