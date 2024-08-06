import React from 'react'

const UpperBtns = ({setQuery}) => {
const cities = [
    {id:1,
    cityName: "London"
},
    {id:2,
    cityName: "Tokyo"
},
    {id:3,
    cityName: "Istanbul"
},
    {id:4,
    cityName: "Berlin"
},
    {id:5,
    cityName: "Nairobi"
}
]

  return (
    <div className='hidden md:flex md:items-center md:justify-around my-6'>
{cities.map((city)=>{
const {id,cityName} = city;
return(
    <div key={id}>
<button onClick={()=> setQuery({q: city.cityName})} className='text-white text-lg font-medium'>{cityName}</button>
    </div>
    
)
})}
    </div>
  )
}

export default UpperBtns