import React from 'react'
import Hero from '../components/Hero'
import PopularBooks from '../components/PopularBooks'
import HomeAuthors from '../components/HomeAuthors'
import OrderCard from '../components/OrderCard'

const HomePage = () => {
  return (
    <div className=''>
      <Hero/>
      <div className="my-12" />
      <PopularBooks/>
       <div className="my-12" />
      <HomeAuthors/>
      <OrderCard/>
    </div>
  )
}

export default HomePage