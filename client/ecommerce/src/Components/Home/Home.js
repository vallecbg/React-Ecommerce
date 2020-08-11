import React, { useContext, useState, useEffect } from "react";
import {
  Typography,
  makeStyles
} from '@material-ui/core'
import Hero from "./Hero";
import TextSection from "./TextSection";
import ProductsList from "../Products/ProductsList/ProductsList";
import { StoreContext } from "../../Store/Store";
import productService from "../../Services/productService";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '30px',
  },
}))

const heroImages = ["/banner2.jpeg", "/banner3.jpg"];

const Home = () => {
  const { state } = useContext(StoreContext);
  const classes = useStyles()
  console.log(state);
  const [products, setProducts] = useState();

  useEffect(() => {
    productService.getAll().then(({ data: currProducts }) => {
      setProducts(
        currProducts.filter(function (pr) {
          return pr.popular === true && pr.isDeleted === false;
        }).slice(0, 4)
      );
    });
  }, []);

  return (
    <div>
      <Hero
        backgroundImg={
          heroImages[Math.floor(Math.random() * heroImages.length)]
        }
        titleText="REACTIFY SHOP"
        subtitleText={
          <span>50% SALE TO ALL LAPTOPS &#8226; 25% TO ALL SMARTPHONES</span>
        }
        primaryBtnText={state.isAuth ? "VIEW MORE" : "SIGN IN"}
        primaryBtnLink={state.isAuth ? "/products" : "/login"}
      />
      {products && (
        <div className={classes.container}>
          <Typography variant="h1" component="h2" align="center">Popular Products</Typography>
          <ProductsList products={products} />
        </div>
      )}
      <TextSection
        text="Our mission as an Reactify Shop is to provide the customer the best experience and huge promotions while shopping."
        bgColor="#3F51B5"
        textColor="#fff"
        borderColor="#998643"
        padding="12px 0"
        btnLink={state.isAuth ? "/products" : "/login"}
        btnText={state.isAuth ? "Check All Products" : "Sign In Now"}
        darkBg={true}
      />
    </div>
  );
};

export default Home;
