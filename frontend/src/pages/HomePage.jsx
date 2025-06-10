import React from 'react'
import Hero from '../components/Hero'
import PopularBooks from '../components/PopularBooks'
import HomeAuthors from '../components/HomeAuthors'
import OrderCard from '../components/OrderCard'
import WhyChooseUs from '../components/WhyChooseUs'

const HomePage = () => {
  return (
    <div className=''>
      <Hero/>
      <div className="my-12" />
      <PopularBooks/>
       <div className="my-12" />
      <HomeAuthors/>
      <div className="my-12" />
      <OrderCard/>
      <div className="my-12" />
      <WhyChooseUs/>
    </div>
  )
}

export default HomePage