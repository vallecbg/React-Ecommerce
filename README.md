![alt text](https://cdn.searchenginejournal.com/wp-content/uploads/2017/11/e-commerce-link-building-760x400.png)
# Project - Reactify

## Type - Online Ecommerce Platform

Demo: [https://reactify-softuni.herokuapp.com/](https://reactify-softuni.herokuapp.com/)

## Demo Users
Email: test@abv.bg
Password: 123456

Email: test2@abv.bg
Password: 123456

## Description
Reactify is your digital place where you can run your online store and manage your orders and products
There are 3 roles - Guest, User and Admin
- Guests have limited permissions - they can see the Home Page, Log in or Register, see Product Details and add Product in cart
- Users can create Orders and see their own Orders in the Dashboard,
- Administrators have their own Admin Panel,
- Administrators can create, edit and delete Categories,
- Administrators can create, edit and delete Products,
- Administrators can change other Users roles,
- Administrators can change Orders status

## Entities

### User
  - Id
  - Password
  - First Name
  - Last Name
  - Email
  - Role
  - Orders Array
  - Created On - Date
  - Last Login - Date
### Product
  - Id 
  - Title
  - Description
  - Category
  - Product Price
  - Delivery Price (0 means free shipping)
  - Creator
  - Is Popular
  - Images Array
  - Is Deleted (When we delete products we shouldn't delete them from the database)
  - Created On - Date
### Order
  - Id
  - Status
  - Products Array
  - Total Price
  - User Info
  -- First Name
  -- Last Name
  -- Address 1
  -- Address 2 (optional)
  -- City
  -- State (optional)
  -- ZIP Code
  -- Country
  - Creator
  - Created On - Date
### Category
- Id
- Title
- Products Array
## Screenshots
### Home Page - Guest
![alt text](https://image.prntscr.com/image/MORO9DngQVG0YOAvye11fQ.png)
![alt text](https://image.prntscr.com/image/c8fo8v9rSK2ydV0RE-yChg.png)
### Authentication
![alt text](https://image.prntscr.com/image/1z5TdXSqSqmEspVxd0L0hA.png)
![alt text](https://image.prntscr.com/image/hwDV1nn-TKugAadi2s6jOQ.png)
### All Products
![alt text](https://image.prntscr.com/image/SKzPQizNQxWlH42TwLDeHg.png)
### Product Details
![alt text](https://image.prntscr.com/image/jXdejum0Teiqxy7y8rFeKQ.png)
### User Dashboard
![alt text](https://image.prntscr.com/image/nck6ucmzT7WcEeOhEhC9iQ.png)
### Shopping Basket and Checkout
![alt text](https://image.prntscr.com/image/apERbECNTcuVeTnBk3Jumg.png)
![alt text](https://image.prntscr.com/image/lvgJsnkISSe6U3pCQzIfsA.png)
![alt text](https://image.prntscr.com/image/WD2is01rQEGykJA3ubGtFg.png)
### Admin Panel
![alt text](https://image.prntscr.com/image/dflnazadSqWHYN7sxQsK1A.png)
![alt text](https://image.prntscr.com/image/9HephUdDSnm0BkGlKPUeSQ.png)
![alt text](https://image.prntscr.com/image/9kUR_kKDR4SOzl-Vv5DmYg.png)
![alt text](https://image.prntscr.com/image/IGbQyQd_Rk_5utuh1F2PXg.png)
![alt text](https://image.prntscr.com/image/nsCSg63iQz2fuNYmeYyyig.png)
![alt text](https://image.prntscr.com/image/PPqpANwORE_AZeex2-T_HQ.png)
![alt text](https://image.prntscr.com/image/Z5fZHQLpSWO9ACEdgxycug.png)
![alt text](https://image.prntscr.com/image/qYILTmp4QFejg0AQQIjYyg.png)
![alt text](https://image.prntscr.com/image/Whu1QP-2RSSqHg_VLwiP2w.png)

## Technologies used and bonuses

 - React JS
 - Used Context API for State Management
 - Material UI
 - MongoDB (Mongoose) + ExpressJS Back-End
 - Deployed the application in cloud environment (Heroku)
 - Used File Storage Cloud API (Cloudinary)
 - Using MongoDB Atlas for database storage

