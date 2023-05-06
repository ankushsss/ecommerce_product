import React, { useState } from 'react';

import SideNavBar from '../components/dashboard/sideNavBar';
import TopBar from '../components/dashboard/topBar';
import Footer from '../components/dashboard/footer';
import { Outlet } from 'react-router-dom';


const Dashboard = () => {
  const [open,setOpen]= useState(true)
  return (
    <div className="App">
    <TopBar open={open} setOpen={setOpen}/>
    <div className="page-wrapper">
        <SideNavBar  openBox={open} setOpenBox={setOpen}/>
       <div className="content-area-wrapper">
          <Outlet/>
         <Footer/>
       </div>
    </div>
 </div>
  )
}

export default Dashboard
