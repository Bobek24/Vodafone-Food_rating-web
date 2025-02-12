import Star_rating from './Star_rating.jsx'
import { useEffect, useState } from 'react'
      

function FoodCard(props){
    const [selectedRating, setSelectedRating] = useState(null);
    return(
        <div className="foodCard">
            <img className="foodImage" src={props.image} alt="a" ></img>
            <h2>{props.name}</h2>
            <p>{props.description}</p>
            <Star_rating onRatingChange={(rating) => setSelectedRating(rating)} />
            <p>Selected: {selectedRating} </p>
        </div>
    );
}

export default FoodCard