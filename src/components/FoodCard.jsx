import StarRating from './StarRating.jsx';
import { useState } from 'react';

function FoodCard({ image, name, description }) {
    const [selectedRating, setSelectedRating] = useState(0);

    return (
        <div className="foodCard">
            <img className="foodImage" src={image} alt={name} />
            <h2>{name}</h2>
            <p>{description}</p>
            <StarRating rating={selectedRating} onRatingChange={setSelectedRating} />
            <p>Vybrané hodnocení: {selectedRating}</p>
        </div>
    );
}

export default FoodCard;
