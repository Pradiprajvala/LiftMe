import React, { useEffect } from 'react'
import Header from './Header'
import '../styles/MyProfile.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import av1 from '../assets/CarImages/car2.jpg'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CarBanner from './CarBanner'
import SingleRequest from './SingleRequest'
import Requests from './Requests'
import ProfileAvatar from '../assets/Icons/add-user.png'
import Loading from './Loading'
const MyProfile = () => {
    const [user,setUser] = useState({})
    const [myCars, setMyCars] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [requests,setRequests] = useState([])
    const [image, setImage] = useState(null);
    const nevigate = useNavigate()
    console.log(user)
    useEffect(() => {
        async function getMyProfile() {
          setIsLoading(true)
        const res = await fetch('/getMyProfile', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      })

      if(res.status === 401){
        alert('please login ton see your profile')
        nevigate('/login')
      } else if(res.status === 200){
        const data = await res.json()
        console.log(data)
        setUser(data)
      }
      setIsLoading(false)
    }

     async function getMyCars() {
      setIsLoading(true)
        console.log('sending')
        const res = await fetch('/getMyCars', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      })

      if(res.status === 401){
        alert('please login ton see your profile')
        nevigate('/login')
      } else if(res.status === 200){
        const data = await res.json()
        console.log(data)
        setMyCars(data)
      } 
      setIsLoading(false)      
    }

    

    async function getRequests() {
      setIsLoading(true)
      
      try {
          const res = await fetch('/getRequests', {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json"
              },
              credentials: "include"
          })
          if (res.status === 401) {
              nevigate('/login')
          } else if (res.status === 200) {
              const data = await res.json()
              setRequests(data)
              // console.log(data)
          }
      } catch (err) {
          console.log(err)
      }
      setIsLoading(false)
  }
  
      getMyProfile()
      getRequests()
      getMyCars()
    },[])


    const imageHandler = (event) => {
      const reader = new FileReader();
      
      reader.onload = () => {
        if(reader.readyState === 2){
          setImage(reader.result)
          console.log(reader.result);   
        }
      }
      reader.readAsDataURL(event.target.files[0])
  }

  const updateProfileImage = async () => {
    try {
      setIsLoading(true)
      const res = await fetch('/updateProfileImage', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          image
        })
      })

      if(res.status === 201){
        alert('profile picture uploded sucessfully')
      } else {
        alert('could not upload profile picture')
      }
      setIsLoading(false)
    } catch(err) {
      setIsLoading(false)
      console.log(err)
      alert('could not upload profile picture')
    }
  }
  return (
    <div className='myProfile'>
        <Header /> 
        {
          isLoading ? <Loading /> :<div className='myProfileContainer' >
          <div className="myProfileHeader">
             <div className='imageDiv'>  
             <input className='imageInput'
          type="file"
          name="profileImage"
          id="inputProfileImage" 
          accept='image/*'      
          onChange={imageHandler} />
              {
                image ? <img className='image' src ={image} />  : user ? user.image ? <img className='image' src ={user.image} /> :  <img src={ProfileAvatar}  className='imageAvatar'  /> :  <img src={ProfileAvatar}  className='imageAvatar'   />
              }
              
          {
            !image ?  <h4 ><label htmlFor="inputProfileImage">Update</label></h4>  : <h4 ><label onClick={updateProfileImage}>Update</label></h4>  
          }
              
              </div>
              
              
              <div className="userInfoContainer">
                  <div className='userInfoName' >
                  <h5>Name :</h5> 
                  <h4>{user ? user.name : null}</h4>
                  </div>
                  <div className='userInfoEmail' >
                  <h5>Email :</h5> 
                  <h4>{user ? user.email : null}</h4>
                  </div>   
              </div>
          </div>
          <div className='myCars'><h4>My Cars</h4></div>
          <div className="body">
                  {
                      myCars ? myCars.myCars ? myCars.myCars.map(myCar => {
                          return <CarBanner car={myCar} isFavourite={false} />
                      }) : null : null
                  }
          </div>
          <div className='myCars'><h4>My Requests</h4></div>
          <div className='myRequests' >
          {
                  user ? user.requestsToMe ?    user.requestsToMe.map(myRequest => {
                          // console.log('car',requests.car)
                          console.log(myRequest)
                          const requestCar = requests ? requests.car ? requests.car.filter(singleCar => myRequest.carId === singleCar._id) : null : null;
                          const requestSender = requests ? requests.sender ? requests.sender.filter(singleSender => myRequest.userId === singleSender._id) : null : null;
                          // console.log('car',requestCar,'sender',requestSender)
                          return requestCar && requestSender ? <>
                              <SingleRequest requestCar={requestCar[0]} requestSender={requestSender[0]} requestId={myRequest._id} isApproved={myRequest.isApproved} />
                          </> : <></>
                      }) : null : null
                  } 
            </div>
      </div>
        }
        </div>
        
  )
}

export default MyProfile