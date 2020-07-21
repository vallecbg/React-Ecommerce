import React from 'react'
// import {
//   makeStyles
// } from '@material-ui/core/styles'
import Hero from './Hero';
import TextSection from './TextSection'
import ProductsList from '../Products/ProductsList/ProductsList'

// const useStyles = makeStyles((theme) => ({
//   content: {},
//   container: {
//     padding: '200px',
//   },
// }))

const heroImages = [
  '/banner2.jpeg',
  '/banner3.jpg'
]

const Home = () => {
  return (
    <div>
      <Hero
        backgroundImg={heroImages[Math.floor(Math.random() * heroImages.length)]}
        titleText="REACTIFY SHOP"
        subtitleText={
          <span>50% SALE TO ALL LAPTOPS &#8226; 25% TO ALL SMARTPHONES</span>
        }
        primaryBtnText="SIGN IN"
        primaryBtnLink="/login"
      />
      {/* TODO: add only the popular products */}
      <ProductsList/>
      <TextSection
        text="Our mission as an Reactify Shop is to provide the customer the best experience and huge promotions while shopping."
        bgColor="#3F51B5"
        textColor="#fff"
        borderColor="#998643"
        padding="12px 0"
        btnLink="/products"
        btnText="Check all products"
        darkBg={true}
      />
      
    </div>
  )
}

export default Home