import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Header.jsx'
import FoodCard from './FoodCard.jsx'

function App() {

  useEffect

 //bude se nacitat z api (asi)
  return(
    <>
   
      <FoodCard image="https://www.jidelnasokolska.cz/images/foots/IMG_1026.jpg" name="Svíčková" description="Neco neco"/>
      <FoodCard image="https://www.jidelnasokolska.cz/images/foots/IMG_1014.jpg" name="Rizzoto" description="Neco neco jineho"/>

    </>
  )
}

export default App
