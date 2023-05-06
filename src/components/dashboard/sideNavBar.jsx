import React, { useState } from 'react'
import Logo from '../../assets/images/icons/Path.svg'
import { Link } from 'react-router-dom'

const SideNavBar = ({openBox,setOpenBox}) => {
    const [open, setOpen] = useState(false )
    
    const [changeActive,setChangeActive] = useState('productList')
  return (
    
    <aside className={openBox?"sidebar-wrapper custom-scrollbar wow fadeInLeft open":"sidebar-wrapper  custom-scrollbar wow fadeInLeft"}>
    <div className="sidebar-content-wrapper">
        <ul className="sidebar-list">
            <li className={open?"sidebar-list-item has-subnav active open":"sidebar-list-item has-subnav active "}  id="listTem">
                <button onClick={()=>setOpen(!open)} className="sidebar-link" id="pro_toggle">
                    <img src={Logo} alt="Product List"/>
                    <span className="item-text">Ecommerce</span>
                </button>

                <ul>
                    <li onClick={()=>setChangeActive('productList')}>
                        <Link to="/dashboard/productList" className={changeActive=="productList"?"sidebar-link active":"sidebar-link"}>Product List</Link>
                    </li>
                    <li onClick={()=>setChangeActive('addProduct')}>
                        <Link to="/dashboard/addProduct" className={changeActive=="addProduct"?"sidebar-link active":"sidebar-link"}>Add Product</Link>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</aside>
   
  )
}

export default SideNavBar
