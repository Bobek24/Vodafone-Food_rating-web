

function FoodCard(props){
    return(
        <div className="foodCard">
            <img className="foodImage" src={props.image} alt="a" ></img>
            <h2>{props.name}</h2>
            <p>{props.description}</p>
        </div>
    );
}

export default FoodCard