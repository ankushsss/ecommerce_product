import React,{useState,useEffect} from 'react'
import { Formik,useFormik } from "formik";
import * as Emailvalidator from "email-validator";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/thumbnails/Logo.svg'
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
import { userDataList } from '../redux/reducer/userReducer';

const SignupPage = () => {
    const [userData,setUserData]= useState([]);
    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(()=>{
        setUserData(JSON.parse(localStorage.getItem('users')))

    },[])

    const formik = useFormik({
        initialValues: {
          email: "",
          password:"",
          confirmpassword:""
        },onSubmit: (values) => {
       
            const data = localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):[]

            data.push({"email":values.email,"password":values.password})
            localStorage.setItem('users',JSON.stringify(data))

            dispatch(userDataList(data))
            navigate('/loginPage')
          },
          validate: (values) => {
            let errors = {};
            if (!values.password) {
              errors.password = "This is a required field";
            }
            if (!values.email) {
              errors.email = "This is srequired field";
            }
            if(values.password !=values.confirmpassword)
            {
              errors.confirmpassword = "password does'nt match";

            }
            return errors;
          }
        });
  return (
    <div className="App">
    <div id="wrapper">
       <div className="page-wrapper auth_wrapper">
          <div className="content-area-wrapper">
             <div className="content-wrapper">
                <div className="container">
                   <div className="card products_blc">
                      <div className="card-body">
                         <div className="card_content_wrap text-center"></div>
                         <div className="card_content_wrap text-center">
                            <div className="logo_wrap">
                               <img src={logo} alt="logo"/>
                               <h6>Create an account</h6>
                            </div>
                            <form onSubmit={formik.handleSubmit}>
                               <div className="form_wrapper">
                                  <div className="mb-4"><label for="exampleFormControlInput1" className="form-label label_modify"><span className="mendatary">*</span> Email</label>
                                        <input type="email"  name="email" placeholder="demo@gmail.com" className="form-control input_modify" id="exampleFormControlInput1" onChange={formik.handleChange} value={formik.values.email}/>
                                        {formik.touched.email && formik.errors.email ? (
                                            <div style={{color: "red",fontSize: "12px"}}>{formik.errors.email}</div>
                                          ) : null}
                                  </div>
                                  <div className="mb-4"><label for="exampleFormControlInput1" className="form-label label_modify"> <span className="mendatary">*</span> Password</label>
                                  <input type="password" placeholder="*****" name="password" className="form-control input_modify" onChange={formik.handleChange} id="exampleFormControlInput2" value={formik.values.password}/>
                                  {formik.touched.password && formik.errors.password ? (
                                    <div style={{color: "red",fontSize: "12px"}}>{formik.errors.password}</div>
                                  ) : null}
                                  
                                  </div>
                                  <div className="mb-4">
                                  <label for="exampleFormControlInput1" className="form-label label_modify">
                                   <span className="mendatary">*</span>Confirm Password</label>
                                  <input type="password" onChange={formik.handleChange}  name="confirmpassword" className="form-control input_modify" id="exampleFormControlInput3" placeholder="*****" value={formik.values.confirmpassword}/>
                                  {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
                                    <div style={{color: "red",fontSize: "12px"}}>{formik.errors.confirmpassword}</div>
                                  ) : null}
                                  </div>
                                  
                                  <div className="mb-0 auth_btn"><input  type="submit" value="Sign Up"  className="theme-btn-primary theme-btn"/></div>
                                  <div className="already"> <Link to={'/loginPage'}>Already have Account</Link></div>
                               </div>
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
  )
}

export default SignupPage
