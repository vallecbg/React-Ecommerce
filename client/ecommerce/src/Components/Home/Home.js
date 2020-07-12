import React from 'react'
import {
  Grid,
  createStyles,
  Container,
  Button
} from '@material-ui/core/';
import {
  makeStyles
} from '@material-ui/core/styles'
import Hero from './Hero';

const useStyles = makeStyles((theme) => ({
  content: {},
  container: {
    padding: '200px',
  },
}))

const heroImages = [
  '/banner2.jpeg',
  '/banner3.jpg'
]

const Home = () => {
  const classes = useStyles()
  return (
    <Hero
      backgroundImg={heroImages[Math.floor(Math.random() * heroImages.length)]}
      titleText="REACTIFY SHOP"
      subtitleText={
        <span>50% SALE TO ALL LAPTOPS &#8226; 25% TO ALL SMARTPHONES</span>
      }
      primaryBtnText="SIGN IN"
      primaryBtnLink="/register"
    />
  )
}

export default Home