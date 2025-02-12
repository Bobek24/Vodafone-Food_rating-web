
import { useState } from 'react';
import { FaStar } from 'react-icons/fa'
import styles from './Star.module.css'





function Star_rating({ onRatingChange }){

   


    const [rating, setRating] = useState(null);
    const [hover, setHover]= useState(null);


    const handleRatingClick = (currentRating) => {
        setRating(currentRating);
        if (onRatingChange) {
            onRatingChange(currentRating);
        }
    };

    return(
        <div>
            {[...Array(5)].map((star,index) => {
                const currentRating= index + 1;
                return(
                    <label>
                        <input className={styles.star_input} type='radio' name="rating" value={currentRating} 
                        onClick={()=> handleRatingClick(currentRating)} />
                        <FaStar className={styles.star} 
                        size={50}
                        color={currentRating <= (hover || rating) ? "#ffc100" : "#e4e5e9"}
                        onMouseEnter={() => setHover(currentRating)}
                        onMouseLeave={() => setHover(null)}
                        />
                    </label>
                    
                )
                
            })}

        </div>
    );
}

export default Star_rating