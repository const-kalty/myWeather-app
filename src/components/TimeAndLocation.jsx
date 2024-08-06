import React from 'react'

const TimeAndLocation = ({weather:{formattedLocalTime,name,country}}) => {
  return (
    <div className='text-white'>
        <div className='flex items-center justify-center md:my-6'>
            <p className=''>
              {formattedLocalTime}
            </p>
            
            </div>
        <div className='flex items-center justify-center my-3'>
            <p className="text-xl font-medium   md:text-3xl ">
                {`${name}, ${country}`}
            </p>
        </div>
    </div>
  )
}

export default TimeAndLocation