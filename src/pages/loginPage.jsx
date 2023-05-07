import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from "formik";
import logo from '../assets/images/thumbnails/Logo.svg'
import { useDispatch, useSelector } from 'react-redux'

import {loginUserData} from '../redux/reducer/userLogin';



const LoginPage = () => {
    const [userData,setUserData]= useState(JSON.parse(localStorage.getItem('users')));
    const [alert,setAlert]=useState({open:false,massege:'',type:'success'});
    const navigate = useNavigate();

    const dispatch = useDispatch()


    const formik = useFormik({
        initialValues: {
          email: "",
          password:"",
        
        },onSubmit: (values) => {

            let users=  userData.filter((user,index)=>{
             
                return user.email == values.email
            })

            if(users.length == 1){
                if(users[0].password==values.password){
                   
                    localStorage.setItem('token',process.env.REACT_APP_TOKEN)
                    setAlert({type:"success",open:true,message:'login successfull'})
                    dispatch(loginUserData({email:values.email,password:values.password}))
                  //   window.location.reload()

                }
                else{
                  
                    setAlert({type:"error",open:true,message:'email and password wrong'})
                }
            }
            else{
            
                setAlert({type:"error",open:true,message:'User not found'})

            }

          
            // const data = localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):[]

            // data.push({"email":values.email,"password":values.password})
            // localStorage.setItem('users',JSON.stringify(data))
            // navigate('/loginPage')
          },
          validate: (values) => {
            let errors = {};
            if (!values.password) {
              errors.password = "This is a required field";
            }
            if (!values.email) {
              errors.email = "This is required field";
            }
           
            return errors;
          }
        });

    useEffect(()=>{
        setUserData(JSON.parse(localStorage.getItem('users')))
    },[])
  return (
    <div className="App">
    <div id="wrapper">
       <div className="page-wrapper auth_wrapper">
          <div className="content-area-wrapper">
             <div className="content-wrapper">
                <div className="container">
                   <div className="card products_blc">
                      <div className="card-body">
                         <div className="card_content_wrap text-center">
                            <div className="card_content_wrap text-center">
                               <div className="logo_wrap">
                                  <img src={logo} alt="logo"/>
                                  <h6>Don’t have an account yet?<Link to={'/'} className="signUpSpan" href="signup.html"> Sign Up</Link></h6>
                               </div>
                               <form onSubmit={formik.handleSubmit}>
                                  <div className="form_wrapper">
                                     <div className="mb-4"><label for="exampleFormControlInput1" className="form-label label_modify"><span className="mendatary">*</span> Email</label><input type="email" className="form-control input_modify" id="exampleFormControlInput1" name="email" placeholder="demo@demo.com" onChange={formik.handleChange} value={formik.values.email}/>
                                     {formik.touched.email && formik.errors.email ? (
                                        <div style={{color: "red",fontSize: "12px"}}>{formik.errors.email}</div>
                                      ) : null}
                                     </div>
                                     <div className="mb-4"><label for="exampleFormControlInput2" className="form-label label_modify"> <span className="mendatary">*</span> Password</label><input type="password" className="form-control input_modify" name="password" id="exampleFormControlInput1" placeholder="********" onChange={formik.handleChange} value={formik.values.password}/>
                                     {formik.touched.password && formik.errors.password ? (
                                        <div style={{color: "red",fontSize: "12px"}}>{formik.errors.password}</div>
                                      ) : null}
                                     </div>
                                     <div className="mb-0 auth_btn"><input  type="submit" value="Sign In" className="theme-btn-primary theme-btn"/></div>
                                  </div>
    {alert.open?alert.type=="success"?<div style={{color:'green'}}>{alert.message}</div>:<div style={{color:'red'}}>{alert.message}</div>:""}

                               </form>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
 </div>
  )
}

export default LoginPage
