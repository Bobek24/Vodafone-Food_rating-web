import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import styles from './Star.module.css'; // Volitelné, pokud chcete vlastní styly

function StarRating({ rating = 0, onRatingChange }) {
  const [hover, setHover] = useState(null);

  const handleClick = (currentRating) => {
    if (onRatingChange) {
      onRatingChange(currentRating);
    }
  };

  return (
    <div>
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <label key={index}>
            <input
              className={styles.star_input}
              type="radio"
              name="rating"
              value={currentRating}
              // Schováme input, aby nezabíral místo
              style={{ display: 'none' }}
              onClick={() => handleClick(currentRating)}
            />
            <FaStar
              className={styles.star}
              size={30}
              color={
                currentRating <= (hover || rating)
                  ? "#ffc100"
                  : "#e4e5e9"
              }
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
              style={{ cursor: 'pointer', marginRight: '5px' }}
            />
          </label>
        );
      })}
    </div>
  );
}

export default StarRating;
