import React, {useEffect, useState} from 'react'
import '../styles/Body.css'
import CarBanner from './CarBanner'
// import cars from '../data'
import { useDataLayerValue } from '../DataLayers/DataLayer'
import Loading from './Loading';
function Body() {
  const [{cars,user}, dispatch] = useDataLayerValue();
  const [isLoading, setIsLoading] = useState(false)
  console.log('user from body',user)
  useEffect( () => {
    console.log('i get called')
    async function getCars(){
      console.log('hello mm')
      setIsLoading(true)
      try {
      const carsRes = await fetch('/getCars', {
      "method": "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      })
      console.log('carsRes',carsRes)
      const data = await carsRes.json()
      console.log('cars',data)
      dispatch({type:'UPDATE_CAR', newCars:[...data.cars] })
      } catch(err) {
      console.log(err)
      }
      setIsLoading(false)
    }
    getCars()
  }, [])
  return (
    <div className='body'>
        { 
        isLoading ? <Loading /> :
        cars.map(car => {
            return <CarBanner myFavouriteCars={user ? user.myFavouriteCars : []} car={car} />
          }) 
        } 

    </div>
  )
}

export default Body