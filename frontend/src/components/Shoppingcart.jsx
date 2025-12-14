import './cart.css'
import Card from './Cartdescription'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import i1 from '../i1.png'
import i2 from '../i2.png'
import i3 from '../i3.png'
import i4 from '../i4.png'
import i5 from '../i5.png'
import i6 from '../i6.png'
import i7 from '../i7.png'
import i8 from '../i8.png'
import i9 from '../i9.png'
import i10 from '../i10.png'
import i11 from '../i11.png'
import i12 from '../i12.png'

function Shoppingcart(){

 async function getUser() {
    try {
      const res = await fetch('https://vite-sql-2025.onrender.com/api/inventory');
      const data = await res.json();
      // console.log(data)
      return data;   // IMPORTANT ✔️
    } catch (error) {
      console.log(error);
    }
  }
const [apiData, setApiData] = useState([]);
 useEffect(() => {
    async function fetchData() {
      const data = await getUser();
      if (data) {
        setApiData(data); // save in state ✔️
      }
    }
    fetchData();
  }, []);
  const images = [i1, i2, i3, i4, i5, i6, i7, i8, i9, i10, i11, i12];



  // CART COUNT MANAGEMENT: 
  const [counts, setCounts] = useState(Array(apiData.length). fill(0));

  useEffect(() => {
    // whenever api loads, create count array
    if (apiData.length > 0) {
      setCounts(Array(apiData.length).fill(0));
    }
  }, [apiData]);
  
 //INCREASE : 
 const increase = (index) => {
   const copy = [...counts];      // (...) represent the spread operator or the rest operator,
  copy[index]++;
  setCounts(copy)
 }

 // DECREAASE : 
 const decrease = (index) => {
  const copy = [...counts];
  if(copy[index] > 0) copy[index]--;
  setCounts(copy);
 }

 // total count for cart icon : 
 const totalcartcount = counts.reduce((a,b) => a+b , 0)

    return (
       <div className='entire'>
         <div className="card-container">
       <h1 className='heading'>Shopping cart
         <Link 
         to="/Bill"
         state = {{
          items : apiData,
          counts : counts,
          images : images
         }}
         >
            <div className="cart-div">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-cart2"
            viewBox="0 0 16 16"
          >
            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
          </svg>
          <div className="count">{totalcartcount}</div>
        </div>
         </Link>
         </h1>

          {apiData.map((item, index) => (
              <Card   
                key = {index}
                image={images[index]} 
                title={item.PRODUCT_NAME}
                price={item.PRICE_PER_QUANTITY}
                count = {counts[index] || 0}
                onIncrease={() => increase(index)}
                onDecrease={() => decrease(index)}
               
               />
                
          ))}
           
               

   </div>

</div>
    );
 
  }

export default Shoppingcart;
