import '../styles/Sidebar.css'
import {Link} from 'react-router-dom'
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import React from 'react'
import { Slider } from '@mui/material';
const Sidebar = () => {
  return (
    <div className="sidebar">
        <Link to='/postCar' className='postCarLink'> Post Car</Link>
        <div className="sidebar__container">
        <p>TYPE</p>
        <SidebarCarCatagory  isSelected={true} title='Sport' availableCars={10}/>
        <SidebarCarCatagory isSelected={true} title='SUV' availableCars={12}/>
        <SidebarCarCatagory isSelected={false} title='MPV' availableCars={16}/>
        <SidebarCarCatagory isSelected={false} title='Sedan' availableCars={20}/>
        <SidebarCarCatagory isSelected={false} title='Coupe' availableCars={14}/>
        <SidebarCarCatagory isSelected={false} title='Hatchback' availableCars={14}/>
        <p>CAPACITY</p>
        <SidebarCarCapacity isSelected={true} title='2 Person' availableCars={10}/>
        <SidebarCarCapacity isSelected={false} title='4 Person' availableCars={14}/>
        <SidebarCarCapacity isSelected={false} title='6 Person' availableCars={12}/>
        <SidebarCarCapacity isSelected={true} title='8 or More' availableCars={16}/>
        <p>PRICE</p>
        <div className='slider'>
        <Slider />
        </div>
        <h4>Max. $100.00</h4>
        </div>
    </div>
  )
}

const SidebarCarCatagory = ({isSelected,title,availableCars}) => {
    return (
        <div className='sidecar__carCatagory'>
            
        {  
            isSelected ? <CheckBoxIcon style={{color: '#3563E9'}}  className='sidecar__carCatagoryIcon' /> : <CheckBoxOutlineBlankIcon style={{color: '#90A3BF'}} className='sidecar__carCatagoryIcon'/>
        }
      
        <h4>{title}</h4>
        <p>({availableCars})</p>
        </div>
    )
}


const SidebarCarCapacity = ({isSelected,title,availableCars}) => {
    return (
        <div className='sidecar__carCatagory'>
            
        {  
            isSelected ? <CheckBoxIcon style={{color: '#3563E9'}}  className='sidecar__carCatagoryIcon' /> : <CheckBoxOutlineBlankIcon style={{color: '#90A3BF'}} className='sidecar__carCatagoryIcon'/>
        }
      
        <h4>{title}</h4>
        <p>({availableCars})</p>
        </div>
    )
}


export default Sidebar