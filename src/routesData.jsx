import React, { useEffect, useState } from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import LoginPage from './pages/loginPage'
import SignupPage from './pages/signupPage'
import AddProduct from './pages/addProduct'
import EditProduct from './components/dashboard/editProduct'
import ProductList from './components/dashboard/productList'
import Dashboard from './pages/dashboard'
import { useSelector } from 'react-redux'
const RoutesData = () => {

  const {userLogin} = useSelector(state => state)
    const [isLogin, setIsLogin] = useState(()=>{
      
        if(localStorage.getItem('token'))
        {
            if(localStorage.getItem('token') == process.env.REACT_APP_TOKEN)
            {
                return true
            }
            else{
                return false
            }

        }
        else{
            return false
        }
    })
    useEffect(()=>{
        if (userLogin)
        {
          if(userLogin.email)
          {
          localStorage.setItem("loginUser",JSON.stringify(userLogin))
          }
  
        }
       
      

    },[userLogin])
  return (
    <Routes>
      <Route path='/loginPage' element={userLogin.email?<Navigate to="/dashboard/productList"/>:isLogin?<Navigate to="/dashboard/productList"/>:<LoginPage/>}/>
      <Route path='/' element={userLogin.email?<Navigate to="/dashboard/productList"/>:isLogin?<Navigate to="/dashboard"/>:<SignupPage/>}/>
      <Route path='/dashboard' element={userLogin.email?<Dashboard/>:isLogin?<Dashboard/>:<Navigate to="/"/>}>
        <Route path='productList' element={<ProductList/>}/>
        <Route path='addProduct' element={<AddProduct/>}/>
        <Route path='editProduct/:id' element={<EditProduct/>}/>


      </Route>
    </Routes>
  )
}

export default RoutesData
