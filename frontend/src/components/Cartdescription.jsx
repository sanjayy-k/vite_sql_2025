import './cart.css'
import { useState } from 'react';
import { useEffect } from 'react';

const Card = ({title, image , price, count, onIncrease, onDecrease}) => {
    return (
        <div className="card">
            <img src = {image} />
                 <h3 className='prodname'>{title}</h3>

             <div className='row'>
                 <h3 className='price'>₹ {price}</h3>
             <div className='quantity-buttons'>

             <button className = "minus" onClick={onDecrease} 
             
             > - </button>

             <div className='count'>{count}</div>
             
             <button className = "plus" onClick={onIncrease}

             > + </button>
             </div>
         </div> 

        </div>
       
    )

}
export default Card;