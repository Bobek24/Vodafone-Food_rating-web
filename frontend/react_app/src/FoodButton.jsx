import React, {useState,useEffect} from 'react';
import FoodCard from './FoodCard';

function FoodButton(){
    const [login, setLogin] = useState(0);
    
    const changeLog = () =>{
        if(login == 0)
            {

                setLogin(1)
            }
        else
        {
            setLogin(0)
        }
    }
    
    return(
        <div className='logForm'>
        <p>Login/ Logout</p>
        <p>Login: {login} </p>
        <button onClick={changeLog}>log</button>
        </div>
    );
}

export default FoodButton