import Header from './components/Header'
import './Home.css';
import React, { useEffect } from 'react'
import Body from './components/Body'
import Sidebar from './components/Sidebar';
import { useDataLayerValue } from './DataLayers/DataLayer';
import axios from 'axios'
import { baseUrl } from './App';

function Home() {
  const [dispatch] = useDataLayerValue()
  useEffect(() => {
    async function fetchUser() {
      try {

        console.log('i got called homee')
        console.log('log1');

        const res = await axios.get(baseUrl+'/getCurrentUser', {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          withCredentials: true
        })
        console.log('log2')

        
        // const res = await fetch(baseUrl + '/getCurrentUser', {
        //   method: "GET",
        //   headers: {
        //     Accept: "application/json",
        //     "Content-Type": "application/json"
        //   },
        //   credentials: "include"
        // })
        console.log('hey its me')
        if(res){
          const user = await res.data
          console.log('this user',user)
          dispatch({
            type: 'SET_USER',
            user: user
          })
        } else {
          console.log('no user')
        }

      } catch (err) {
        console.log('me error',err)
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