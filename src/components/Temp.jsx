import React from "react";
import { FaThermometerEmpty, FaThermometerHalf, FaWind } from "react-icons/fa";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const Temp = ({units, weather:{details,icon,temp,temp_min,temp_max,sunrise,sunset,speed,humidity,feels_like}}) => {

  const tempDetails = [
    { id: 1, Icon: FaThermometerEmpty, title: "Real Feel :", value:`${feels_like.toFixed()}°` },
    { id: 2, Icon: FaThermometerHalf, title: "Humidity :", value:`${humidity.toFixed()}%` },
    { id: 3, Icon: FaWind, title: "Wind :", value:`${speed.toFixed()} ${units === "metric" ? "km/h" : "m/s"}` },
  ];

  const sunDetails = [
    { id: 1, Icon: GiSunrise, title: "Sunrise", value: sunrise },
    { id: 2, Icon: GiSunset, title: "Sunset", value: sunset },
    { id: 3, Icon: MdKeyboardArrowUp, title: "High", value:`${temp_max.toFixed()}°`  },
    { id: 4, Icon: MdKeyboardArrowDown, title: "Low", value: `${temp_min.toFixed()}°` },
  ];

  return (
    <div>
      <div className="text-center  text-xl text-cyan-300 md:py-6">
        <p>{details}</p>
      </div>
      <div className="flex flex-col pb-2   items-center justify-between text-white md:flex-row md:py-3">
        <img
          className="w-20"
          src={icon}
          alt="weather icon"
        />
        <p className=" pb-2 md:text-5xl">{`${temp.toFixed()}°`}</p>
        <div className="flex flex-col space-py-3 items-start">
          {tempDetails.map((deets) => {
            const { id, Icon, title, value } = deets;
            return (
              <div
                key={id}
                className="flex items-center justify-center font-light text-sm"
              >
                <Icon size={25} className="pe-2 py-1" />
                <span className="me-3">{title}</span>
                <span>{value}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between text-white py-6">
       {
        sunDetails.map((deets)=>{
const { id, Icon, title, value }  = deets
return(
  <div key={id} className="grid  md:flex md:flex-row md:items-center">
<Icon size={30} />
<span className="font-semibold me-3">{title}</span>
                <span>{value}</span>
  </div>
)
        })
       }
      </div>
    </div>
  );
};

export default Temp;
