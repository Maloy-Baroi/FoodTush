import React from 'react'
import heroStyle from '../../../styles/Hero.module.css'

const Hero = () => {
  return (
    <div>
      <div className={heroStyle.wrapper}>
      <h1 className={heroStyle.heroTitle}>Order food to your door</h1>
      </div>
      <p className={heroStyle.heroDescription}>You Love Most To Order. Order Now, We Will Deliver To Your Home On The Right Time.</p>
    </div>
  )
}

export default Hero
