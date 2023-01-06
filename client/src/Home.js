import Header from './components/Header'
import './Home.css';
import React, { useEffect } from 'react'
import Body from './components/Body'
import Sidebar from './components/Sidebar';
import { useDataLayerValue } from './DataLayers/DataLayer';
function Home() {
  const [{user}, dispatch] = useDataLayerValue()
  useEffect(() => {
    async function fetchUser() {
      console.log('i got called homee')
      const res = await fetch('/getCurrentUser', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      })

      if(res){
        const data = await res.json()
        console.log('data', data)
        dispatch({
          type: 'SET_USER',
          user: data.user
        })
      } else {
        console.log('no user')
      }
    }
    
    fetchUser()
  },[])
  return (
    <>
     
      <div className="app">
      <Header />
        <div className='content'>
        <Sidebar />
        <Body />
        </div>
      </div>
    </>
  );
}

export default Home;