import React,{useState,useEffect} from 'react'
import productJsonData from '../../JsonData/productList.json'
import { Link, json } from 'react-router-dom'
import { productAdd } from '../../redux/reducer/productReducer'
import { useDispatch } from 'react-redux'
const ProductList = () => {
const [products, setProducts] = useState([])
const [searchData, setSearchData] = useState([])
const dispatch = useDispatch()


useEffect(()=>{

   if(localStorage.getItem('products'))
   {
      setProducts(JSON.parse(localStorage.getItem('products')))
      setSearchData(JSON.parse(localStorage.getItem('products')))
      dispatch(productAdd(localStorage.getItem('products')))


   }
   else{
      
      localStorage.setItem('products',JSON.stringify(productJsonData))
      dispatch(productAdd(productJsonData))
      setSearchData(productJsonData)
   }

},[])

const deleteProduct =(indexValue)=>{
   const newProductList  = products.filter((product,index)=>{
      return product.checkbox != indexValue
   })
   setProducts([...newProductList])
   setSearchData([...newProductList])
   localStorage.setItem('products',JSON.stringify(newProductList))
}
const Action = ({product})=>{
   const [open,setOpen] = useState(false)

   return(<div className={open?"dropdown dropdown_wrapper show":"dropdown dropdown_wrapper "}>
   <button onClick={()=>setOpen(!open)} className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACFSURBVEiJ7ZSxCYAwEEUfWmrhEilTuZMTGTdwB+dwB0FXsNHCiAFBIl4KSR78JnD//nHhICY00FtpafMSWIDNarZvYtSO+alaskHJkdqdoPApzD0brMAAVMAINMD0OmYUKKsgdFxLNtLmivs39Zokk07yBcOVvg3VJOiS/08614+kcx2OHQgqLpVdcUDeAAAAAElFTkSuQmCC" alt="Donts"/></button>
   <div className={open?"dropdown-menu dropdown-menu-right show ":"dropdown-menu dropdown-menu-right "}><Link className="dropdown-item" to={`/dashboard/editProduct/${product.checkbox}`}>Edit Product</Link><button onClick={()=>deleteProduct(product.checkbox)} className="dropdown-item">Delete</button></div>
</div>)
}

  return (
    <div className="content-area-wrapper">
             <div className="content-wrapper">
                <div className="filter_wrapper  d-block d-sm-none">
                   <div className="filet_left_content">
                      <div className="input-group">
                         <div className="input-group-prepend"><span className="input-group-text" id="basic-addon1"><img src="images/icons/magnifying-glass.png" alt="search"/></span></div>
                         <input type="text" className="form-control input_modify" placeholder="Search"/>
                      </div>
                   </div>
                </div>
                <div className="heading_wrapper d-flex flex-wrap">
                   <h1 className="head_title">Product List</h1>
                   <nav aria-label="breadcrumb" className="breadcrumb_wrapper">
                      <ul className="breadcrumb">
                         <li className="breadcrumb-item">E-Commerce</li>
                         <li className="breadcrumb-item active" aria-current="page">Product List</li>
                      </ul>
                   </nav>
                </div>
                <div className="card products_blc">
                   <div className="card-body">
                      <div className="filter_wrapper">
                         <div className="filet_left_content">
                            <div className="input-group">
                               <div className="input-group-prepend"><span className="input-group-text" id="basic-addon1"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAABHNCSVQICAgIfAhkiAAAAXtJREFUOE+tVEFOwkAU7e8Q1yyNmFhv0Ih7yg1acW89AXADj1BOYN2D9gaUPZjeABZiXLI2DOObZmiGwSKGTjJpZ/6819f/3x+yjHHu+g6r1bpCCA8hV4UzIkr5ej34ypKFidmuSQ80mp1IWFYXey+YiU20kvGNEHU8fMwHkEbL6bD/G2FBdtHsZDmQc7/s61K1zViCY/PP2SgwCXMypcg749xbZEmupmw4rl//ZiwFMF3ORj39HKmvzaHo+lA+dFAZhpSqOmSHhxSZMaQlhrqVro5Urp5AJnNx9ADOJyF6y/dXr6gmNgWq1v6YDtOjmXDw8vbeQ5XHEFEUUSqrlExaoprfrLQAlVpDM20Lpm0fadoxsj7ZM+22giiEtMYVzBv80U5vOOfCFo+wRbzTAfpCa/TYIko2qtFt2ehCyEYPoWiA90wQPZuEO7eGJM6vIMZ6ALgAtOQeQBOQZ5zzaKu6cXMXmoR7ZP8xrkl4EllePKUQr8HJZAWhbTs/jATsJjmQpCoAAAAASUVORK5CYII=" alt="search"/></span></div>
                               <input type="text"  onChange={(e)=>{
                                 console.log(e.target.value)
                                 if(e.target.value)
                                 {
                                     let filter = products.filter((product)=>{
                                       
                                       return product.name.toLowerCase().includes(e.target.value)
                                     })
      
                                     setSearchData([...filter])
                                    }
                                    else{
                                       setSearchData(JSON.parse(localStorage.getItem('products')))
                                    }
      
                               }} className="form-control input_modify" placeholder="Search"/>
                            </div>
                            <select className="custom-select input_modify" onChange={(e)=>{
                                  if(e.target.value == "All")
                                  {
                                    setSearchData(JSON.parse(localStorage.getItem('products')))

                                  }
                                  else
                                  {
                                    let filter = products.filter((product)=>{
                                       
                                       return product.category.toLowerCase() == e.target.value.toLowerCase()
                                     })
      
                                     setSearchData([...filter])
                                  }
                            }}>
                               <option selected>All</option>
                                <option value="Cloths">Cloths</option>
                                <option value="Bags">Bags</option>
                                <option value="Shoes">Shoes</option>
                                <option value="Watches">Watches</option>
                                <option value="Devices">Devices</option>
                            </select>
                         </div>
                         <div className="filter_btn_wrapper">
                            <Link className="btn theme-btn-primary theme-btn" to="/dashboard/addProduct">Add Product</Link>
                        </div>
                      </div>
                      <div className="app_table table-responsive">
                         <table className="table">
                            <thead>
                               <tr>
                                  <th scope="col"><label className="checkbox_container text-uppercase"> ID</label></th>
                                  <th scope="col" className="th_didivder">
                                     Products 
                                     <span className="filter-order-link">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="13" viewBox="0 0 11 13">
                                           <g id="Group_22146" data-name="Group 22146" transform="translate(-501 -126.5)">
                                              <path id="Icon_ionic-md-arrow-dropdown" data-name="Icon ionic-md-arrow-dropdown" d="M9,13.5,14.5,19,20,13.5Z" transform="translate(492 120.5)" fill="rgba(69,85,96,0.2)"></path>
                                              <path id="Icon_ionic-md-arrow-dropdown-2" data-name="Icon ionic-md-arrow-dropdown" d="M9,19l5.5-5.5L20,19Z" transform="translate(492 113)" fill="rgba(69,85,96,0.2)"></path>
                                           </g>
                                        </svg>
                                     </span>
                                  </th>
                                  <th scope="col" className="th_didivder">
                                     Category 
                                     <span className="filter-order-link">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="13" viewBox="0 0 11 13">
                                           <g id="Group_22146" data-name="Group 22146" transform="translate(-501 -126.5)">
                                              <path id="Icon_ionic-md-arrow-dropdown" data-name="Icon ionic-md-arrow-dropdown" d="M9,13.5,14.5,19,20,13.5Z" transform="translate(492 120.5)" fill="rgba(69,85,96,0.2)"></path>
                                              <path id="Icon_ionic-md-arrow-dropdown-2" data-name="Icon ionic-md-arrow-dropdown" d="M9,19l5.5-5.5L20,19Z" transform="translate(492 113)" fill="rgba(69,85,96,0.2)"></path>
                                           </g>
                                        </svg>
                                     </span>
                                  </th>
                                  <th scope="col" className="th_didivder">
                                     Price 
                                     <span className="filter-order-link">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="13" viewBox="0 0 11 13">
                                           <g id="Group_22146" data-name="Group 22146" transform="translate(-501 -126.5)">
                                              <path id="Icon_ionic-md-arrow-dropdown" data-name="Icon ionic-md-arrow-dropdown" d="M9,13.5,14.5,19,20,13.5Z" transform="translate(492 120.5)" fill="rgba(69,85,96,0.2)"></path>
                                              <path id="Icon_ionic-md-arrow-dropdown-2" data-name="Icon ionic-md-arrow-dropdown" d="M9,19l5.5-5.5L20,19Z" transform="translate(492 113)" fill="rgba(69,85,96,0.2)"></path>
                                           </g>
                                        </svg>
                                     </span>
                                  </th>
                                  <th scope="col" className="th_didivder">
                                     Stock 
                                     <span className="filter-order-link">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="13" viewBox="0 0 11 13">
                                           <g id="Group_22146" data-name="Group 22146" transform="translate(-501 -126.5)">
                                              <path id="Icon_ionic-md-arrow-dropdown" data-name="Icon ionic-md-arrow-dropdown" d="M9,13.5,14.5,19,20,13.5Z" transform="translate(492 120.5)" fill="rgba(69,85,96,0.2)"></path>
                                              <path id="Icon_ionic-md-arrow-dropdown-2" data-name="Icon ionic-md-arrow-dropdown" d="M9,19l5.5-5.5L20,19Z" transform="translate(492 113)" fill="rgba(69,85,96,0.2)"></path>
                                           </g>
                                        </svg>
                                     </span>
                                  </th>
                                  <th scope="col" className="th_didivder">
                                     Status 
                                     <span className="filter-order-link">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="13" viewBox="0 0 11 13">
                                           <g id="Group_22146" data-name="Group 22146" transform="translate(-501 -126.5)">
                                              <path id="Icon_ionic-md-arrow-dropdown" data-name="Icon ionic-md-arrow-dropdown" d="M9,13.5,14.5,19,20,13.5Z" transform="translate(492 120.5)" fill="rgba(69,85,96,0.2)"></path>
                                              <path id="Icon_ionic-md-arrow-dropdown-2" data-name="Icon ionic-md-arrow-dropdown" d="M9,19l5.5-5.5L20,19Z" transform="translate(492 113)" fill="rgba(69,85,96,0.2)"></path>
                                           </g>
                                        </svg>
                                     </span>
                                  </th>
                                  <th scope="col" className="th_didivder">
                                     Action 
                                     <span className="filter-order-link">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="13" viewBox="0 0 11 13">
                                           <g id="Group_22146" data-name="Group 22146" transform="translate(-501 -126.5)">
                                              <path id="Icon_ionic-md-arrow-dropdown" data-name="Icon ionic-md-arrow-dropdown" d="M9,13.5,14.5,19,20,13.5Z" transform="translate(492 120.5)" fill="rgba(69,85,96,0.2)"></path>
                                              <path id="Icon_ionic-md-arrow-dropdown-2" data-name="Icon ionic-md-arrow-dropdown" d="M9,19l5.5-5.5L20,19Z" transform="translate(492 113)" fill="rgba(69,85,96,0.2)"></path>
                                           </g>
                                        </svg>
                                     </span>
                                  </th>
                               </tr>
                            </thead>
                            {/*<tbody>
                               <tr>
                                  <td><label className="checkbox_container text-uppercase">1</label></td>
                                  <td>
                                     <div className="media align-items-center">
                                        <div className="product_thumb"><img src="https://upload.wikimedia.org/wikipedia/commons/3/3d/Dress_Shirt_Fitting_on_dummy_Front.JPG" alt="Images"/></div>
                                        <div className="media-body product_des">
                                           <h6 className="product_name">Blue Jacket</h6>
                                        </div>
                                     </div>
                                  </td>
                                  <td className="text_primary">cloths</td>
                                  <td>$30</td>
                                  <td>10</td>
                                  <td>In stock</td>
                                  <td className="actions">
                                     <div className="dropdown dropdown_wrapper ">
                                        <button className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACFSURBVEiJ7ZSxCYAwEEUfWmrhEilTuZMTGTdwB+dwB0FXsNHCiAFBIl4KSR78JnD//nHhICY00FtpafMSWIDNarZvYtSO+alaskHJkdqdoPApzD0brMAAVMAINMD0OmYUKKsgdFxLNtLmivs39Zokk07yBcOVvg3VJOiS/08614+kcx2OHQgqLpVdcUDeAAAAAElFTkSuQmCC" alt="Donts"/></button>
                                        <div className="dropdown-menu dropdown-menu-right  "><a className="dropdown-item" href="editproduct.html">Edit Product</a><button className="dropdown-item">Delete</button></div>
                                     </div>
                                  </td>
                               </tr>
                               <tr>
                                  <td><label className="checkbox_container text-uppercase">2</label></td>
                                  <td>
                                     <div className="media align-items-center">
                                        <div className="product_thumb"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdBPrJxVGq8BksyP6u1j67mO1LxMzjUwxQFw&amp;usqp=CAU" alt="Images"/></div>
                                        <div className="media-body product_des">
                                           <h6 className="product_name">Blue Sneaker</h6>
                                        </div>
                                     </div>
                                  </td>
                                  <td className="text_primary">shoes</td>
                                  <td>$30</td>
                                  <td>10</td>
                                  <td>In stock</td>
                                  <td className="actions">
                                     <div className="dropdown dropdown_wrapper ">
                                        <button className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACFSURBVEiJ7ZSxCYAwEEUfWmrhEilTuZMTGTdwB+dwB0FXsNHCiAFBIl4KSR78JnD//nHhICY00FtpafMSWIDNarZvYtSO+alaskHJkdqdoPApzD0brMAAVMAINMD0OmYUKKsgdFxLNtLmivs39Zokk07yBcOVvg3VJOiS/08614+kcx2OHQgqLpVdcUDeAAAAAElFTkSuQmCC" alt="Donts"/></button>
                                        <div className="dropdown-menu dropdown-menu-right  "><a className="dropdown-item" href="editproduct.html">Edit Product</a><button className="dropdown-item">Delete</button></div>
                                     </div>
                                  </td>
                               </tr>
                               <tr>
                                  <td><label className="checkbox_container text-uppercase">3</label></td>
                                  <td>
                                     <div className="media align-items-center">
                                        <div className="product_thumb"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIUfA2o1Y0fQWyw8tyHnfPwZf3PzLyEicNBA&amp;usqp=CAU" alt="Images"/></div>
                                        <div className="media-body product_des">
                                           <h6 className="product_name">Gray Hoodies</h6>
                                        </div>
                                     </div>
                                  </td>
                                  <td className="text_primary">cloths</td>
                                  <td>$30</td>
                                  <td>10</td>
                                  <td>In stock</td>
                                  <td className="actions">
                                     <div className="dropdown dropdown_wrapper ">
                                        <button className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACFSURBVEiJ7ZSxCYAwEEUfWmrhEilTuZMTGTdwB+dwB0FXsNHCiAFBIl4KSR78JnD//nHhICY00FtpafMSWIDNarZvYtSO+alaskHJkdqdoPApzD0brMAAVMAINMD0OmYUKKsgdFxLNtLmivs39Zokk07yBcOVvg3VJOiS/08614+kcx2OHQgqLpVdcUDeAAAAAElFTkSuQmCC" alt="Donts"/></button>
                                        <div className="dropdown-menu dropdown-menu-right  "><a className="dropdown-item" href="editproduct.html">Edit Product</a><button className="dropdown-item">Delete</button></div>
                                     </div>
                                  </td>
                               </tr>
                               <tr>
                                  <td><label className="checkbox_container text-uppercase">4</label></td>
                                  <td>
                                     <div className="media align-items-center">
                                        <div className="product_thumb"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHrAKoRWG1HJLoGn8TzoAkvIP_HkCJTAs_TA&amp;usqp=CAU" alt="Images"/></div>
                                        <div className="media-body product_des">
                                           <h6 className="product_name">Analog strip Watch</h6>
                                        </div>
                                     </div>
                                  </td>
                                  <td className="text_primary">accessories</td>
                                  <td>$30</td>
                                  <td>10</td>
                                  <td>In stock</td>
                                  <td className="actions">
                                     <div className="dropdown dropdown_wrapper ">
                                        <button className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACFSURBVEiJ7ZSxCYAwEEUfWmrhEilTuZMTGTdwB+dwB0FXsNHCiAFBIl4KSR78JnD//nHhICY00FtpafMSWIDNarZvYtSO+alaskHJkdqdoPApzD0brMAAVMAINMD0OmYUKKsgdFxLNtLmivs39Zokk07yBcOVvg3VJOiS/08614+kcx2OHQgqLpVdcUDeAAAAAElFTkSuQmCC" alt="Donts"/></button>
                                        <div className="dropdown-menu dropdown-menu-right  "><a className="dropdown-item" href="editproduct.html">Edit Product</a><button className="dropdown-item">Delete</button></div>
                                     </div>
                                  </td>
                               </tr>
                               <tr>
                                  <td><label className="checkbox_container text-uppercase">5</label></td>
                                  <td>
                                     <div className="media align-items-center">
                                        <div className="product_thumb"><img src="https://img.faballey.com/images/Product/TOP04947Z/1.jpg" alt="Images"/></div>
                                        <div className="media-body product_des">
                                           <h6 className="product_name">Women Shirt</h6>
                                        </div>
                                     </div>
                                  </td>
                                  <td className="text_primary">cloths</td>
                                  <td>$30</td>
                                  <td>10</td>
                                  <td>Limited stock</td>
                                  <td className="actions">
                                     <div className="dropdown dropdown_wrapper ">
                                        <button className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACFSURBVEiJ7ZSxCYAwEEUfWmrhEilTuZMTGTdwB+dwB0FXsNHCiAFBIl4KSR78JnD//nHhICY00FtpafMSWIDNarZvYtSO+alaskHJkdqdoPApzD0brMAAVMAINMD0OmYUKKsgdFxLNtLmivs39Zokk07yBcOVvg3VJOiS/08614+kcx2OHQgqLpVdcUDeAAAAAElFTkSuQmCC" alt="Donts"/></button>
                                        <div className="dropdown-menu dropdown-menu-right  "><a className="dropdown-item" href="editproduct.html">Edit Product</a><button className="dropdown-item">Delete</button></div>
                                     </div>
                                  </td>
                               </tr>
                               <tr>
                                  <td><label className="checkbox_container text-uppercase">6</label></td>
                                  <td>
                                     <div className="media align-items-center">
                                        <div className="product_thumb"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwcGgPyiWVBPw1RaD7TptDPJVcMq15eBNnYg&amp;usqp=CAU" alt="Images"/></div>
                                        <div className="media-body product_des">
                                           <h6 className="product_name">fan</h6>
                                        </div>
                                     </div>
                                  </td>
                                  <td className="text_primary">electronics</td>
                                  <td>$30</td>
                                  <td>0</td>
                                  <td>out of stock</td>
                                  <td className="actions">
                                     <div className="dropdown dropdown_wrapper ">
                                        <button className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACFSURBVEiJ7ZSxCYAwEEUfWmrhEilTuZMTGTdwB+dwB0FXsNHCiAFBIl4KSR78JnD//nHhICY00FtpafMSWIDNarZvYtSO+alaskHJkdqdoPApzD0brMAAVMAINMD0OmYUKKsgdFxLNtLmivs39Zokk07yBcOVvg3VJOiS/08614+kcx2OHQgqLpVdcUDeAAAAAElFTkSuQmCC" alt="Donts"/></button>
                                        <div className="dropdown-menu dropdown-menu-right  "><a className="dropdown-item" href="editproduct.html">Edit Product</a><button className="dropdown-item">Delete</button></div>
                                     </div>
                                  </td>
                               </tr>
                               <tr>
                                  <td><label className="checkbox_container text-uppercase">7</label></td>
                                  <td>
                                     <div className="media align-items-center">
                                        <div className="product_thumb"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRk5MlQAG8njzCbgTRnHpzCchiRibUDnoNbw&amp;usqp=CAU" alt="Images"/></div>
                                        <div className="media-body product_des">
                                           <h6 className="product_name">Denim Jeans</h6>
                                        </div>
                                     </div>
                                  </td>
                                  <td className="text_primary">cloths</td>
                                  <td>$30</td>
                                  <td>10</td>
                                  <td>In stock</td>
                                  <td className="actions">
                                     <div className="dropdown dropdown_wrapper ">
                                        <button className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACFSURBVEiJ7ZSxCYAwEEUfWmrhEilTuZMTGTdwB+dwB0FXsNHCiAFBIl4KSR78JnD//nHhICY00FtpafMSWIDNarZvYtSO+alaskHJkdqdoPApzD0brMAAVMAINMD0OmYUKKsgdFxLNtLmivs39Zokk07yBcOVvg3VJOiS/08614+kcx2OHQgqLpVdcUDeAAAAAElFTkSuQmCC" alt="Donts"/></button>
                                        <div className="dropdown-menu dropdown-menu-right  "><a className="dropdown-item" href="editproduct.html">Edit Product</a><button className="dropdown-item">Delete</button></div>
                                     </div>
                                  </td>
                               </tr>
                               <tr>
                                  <td><label className="checkbox_container text-uppercase">8</label></td>
                                  <td>
                                     <div className="media align-items-center">
                                        <div className="product_thumb"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk0qzZFMH6aO52mvAUkv0Fl7ikrQGUYx8S7w&amp;usqp=CAU" alt="Images"/></div>
                                        <div className="media-body product_des">
                                           <h6 className="product_name">Headphone</h6>
                                        </div>
                                     </div>
                                  </td>
                                  <td className="text_primary">electronics</td>
                                  <td>$30</td>
                                  <td>10</td>
                                  <td>In stock</td>
                                  <td className="actions">
                                     <div className="dropdown dropdown_wrapper ">
                                        <button className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACFSURBVEiJ7ZSxCYAwEEUfWmrhEilTuZMTGTdwB+dwB0FXsNHCiAFBIl4KSR78JnD//nHhICY00FtpafMSWIDNarZvYtSO+alaskHJkdqdoPApzD0brMAAVMAINMD0OmYUKKsgdFxLNtLmivs39Zokk07yBcOVvg3VJOiS/08614+kcx2OHQgqLpVdcUDeAAAAAElFTkSuQmCC" alt="Donts"/></button>
                                        <div className="dropdown-menu dropdown-menu-right  "><a className="dropdown-item" href="editproduct.html">Edit Product</a><button className="dropdown-item">Delete</button></div>
                                     </div>
                                  </td>
                               </tr>
                               <tr>
                                  <td><label className="checkbox_container text-uppercase">9</label></td>
                                  <td>
                                     <div className="media align-items-center">
                                        <div className="product_thumb"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2n5BgGptM3vYVRoTuY-6NE1Bvx_YEyX7hdg&amp;usqp=CAU" alt="Images"/></div>
                                        <div className="media-body product_des">
                                           <h6 className="product_name">laptop</h6>
                                        </div>
                                     </div>
                                  </td>
                                  <td className="text_primary">electronics</td>
                                  <td>$30</td>
                                  <td>50</td>
                                  <td>Limited stock</td>
                                  <td className="actions">
                                     <div className="dropdown dropdown_wrapper ">
                                        <button className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACFSURBVEiJ7ZSxCYAwEEUfWmrhEilTuZMTGTdwB+dwB0FXsNHCiAFBIl4KSR78JnD//nHhICY00FtpafMSWIDNarZvYtSO+alaskHJkdqdoPApzD0brMAAVMAINMD0OmYUKKsgdFxLNtLmivs39Zokk07yBcOVvg3VJOiS/08614+kcx2OHQgqLpVdcUDeAAAAAElFTkSuQmCC" alt="Donts"/></button>
                                        <div className="dropdown-menu dropdown-menu-right  "><a className="dropdown-item" href="editproduct.html">Edit Product</a><button className="dropdown-item">Delete</button></div>
                                     </div>
                                  </td>
                               </tr>
                               <tr>
                                  <td><label className="checkbox_container text-uppercase">10</label></td>
                                  <td>
                                     <div className="media align-items-center">
                                        <div className="product_thumb"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQewaKjSKvBOYvy8e3BcK1E1o0sZAaHeX8Gw&amp;usqp=CAU" alt="Images"/></div>
                                        <div className="media-body product_des">
                                           <h6 className="product_name">Raybon Google</h6>
                                        </div>
                                     </div>
                                  </td>
                                  <td className="text_primary">accessories</td>
                                  <td>$30</td>
                                  <td>50</td>
                                  <td>In stock</td>
                                  <td className="actions">
                                     <div className="dropdown dropdown_wrapper ">
                                        <button className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACFSURBVEiJ7ZSxCYAwEEUfWmrhEilTuZMTGTdwB+dwB0FXsNHCiAFBIl4KSR78JnD//nHhICY00FtpafMSWIDNarZvYtSO+alaskHJkdqdoPApzD0brMAAVMAINMD0OmYUKKsgdFxLNtLmivs39Zokk07yBcOVvg3VJOiS/08614+kcx2OHQgqLpVdcUDeAAAAAElFTkSuQmCC" alt="Donts"/></button>
                                        <div className="dropdown-menu dropdown-menu-right  "><a className="dropdown-item" href="editproduct.html">Edit Product</a><button className="dropdown-item">Delete</button></div>
                                     </div>
                                  </td>
                               </tr>
                               <tr>
                                  <td><label className="checkbox_container text-uppercase">11</label></td>
                                  <td>
                                     <div className="media align-items-center">
                                        <div className="product_thumb"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVd3yse2dmLNzT1WXm3peJQY-Bgx88oyWJYw&amp;usqp=CAU" alt="Images"/></div>
                                        <div className="media-body product_des">
                                           <h6 className="product_name">iphone 14</h6>
                                        </div>
                                     </div>
                                  </td>
                                  <td className="text_primary">electronics</td>
                                  <td>$30</td>
                                  <td>50</td>
                                  <td>In stock</td>
                                  <td className="actions">
                                     <div className="dropdown dropdown_wrapper ">
                                        <button className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACFSURBVEiJ7ZSxCYAwEEUfWmrhEilTuZMTGTdwB+dwB0FXsNHCiAFBIl4KSR78JnD//nHhICY00FtpafMSWIDNarZvYtSO+alaskHJkdqdoPApzD0brMAAVMAINMD0OmYUKKsgdFxLNtLmivs39Zokk07yBcOVvg3VJOiS/08614+kcx2OHQgqLpVdcUDeAAAAAElFTkSuQmCC" alt="Donts"/></button>
                                        <div className="dropdown-menu dropdown-menu-right  "><a className="dropdown-item" href="editproduct.html">Edit Product</a><button className="dropdown-item">Delete</button></div>
                                     </div>
                                  </td>
                               </tr>
                               <tr>
                                  <td><label className="checkbox_container text-uppercase">12</label></td>
                                  <td>
                                     <div className="media align-items-center">
                                        <div className="product_thumb"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2ZZni4MlsPOQYoWogI6L1uc7G6rp1ldxm-g&amp;usqp=CAU" alt="Images"/></div>
                                        <div className="media-body product_des">
                                           <h6 className="product_name">Refrigerator</h6>
                                        </div>
                                     </div>
                                  </td>
                                  <td className="text_primary">electronics</td>
                                  <td>$30</td>
                                  <td>50</td>
                                  <td>In stock</td>
                                  <td className="actions">
                                     <div className="dropdown dropdown_wrapper ">
                                        <button className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACFSURBVEiJ7ZSxCYAwEEUfWmrhEilTuZMTGTdwB+dwB0FXsNHCiAFBIl4KSR78JnD//nHhICY00FtpafMSWIDNarZvYtSO+alaskHJkdqdoPApzD0brMAAVMAINMD0OmYUKKsgdFxLNtLmivs39Zokk07yBcOVvg3VJOiS/08614+kcx2OHQgqLpVdcUDeAAAAAElFTkSuQmCC" alt="Donts"/></button>
                                        <div className="dropdown-menu dropdown-menu-right  "><a className="dropdown-item" href="editproduct.html">Edit Product</a><button className="dropdown-item">Delete</button></div>
                                     </div>
                                  </td>
                               </tr>
                               <tr>
                                  <td><label className="checkbox_container text-uppercase">13</label></td>
                                  <td>
                                     <div className="media align-items-center">
                                        <div className="product_thumb"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUPQu5YWxH-lS-qoXN5DAHWk11yLrvMtcSEw&amp;usqp=CAU" alt="Images"/></div>
                                        <div className="media-body product_des">
                                           <h6 className="product_name">Cammera</h6>
                                        </div>
                                     </div>
                                  </td>
                                  <td className="text_primary">electronics</td>
                                  <td>$30</td>
                                  <td>50</td>
                                  <td>In stock</td>
                                  <td className="actions">
                                     <div className="dropdown dropdown_wrapper ">
                                        <button className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACFSURBVEiJ7ZSxCYAwEEUfWmrhEilTuZMTGTdwB+dwB0FXsNHCiAFBIl4KSR78JnD//nHhICY00FtpafMSWIDNarZvYtSO+alaskHJkdqdoPApzD0brMAAVMAINMD0OmYUKKsgdFxLNtLmivs39Zokk07yBcOVvg3VJOiS/08614+kcx2OHQgqLpVdcUDeAAAAAElFTkSuQmCC" alt="Donts"/></button>
                                        <div className="dropdown-menu dropdown-menu-right  "><a className="dropdown-item" href="editproduct.html">Edit Product</a><button className="dropdown-item">Delete</button></div>
                                     </div>
                                  </td>
                               </tr>
                               <tr>
                                  <td><label className="checkbox_container text-uppercase">14</label></td>
                                  <td>
                                     <div className="media align-items-center">
                                        <div className="product_thumb"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpOE8CF8ZK0rN-yAfBtwjBKrpYsQcHVtpO_g&amp;usqp=CAU" alt="Images"/></div>
                                        <div className="media-body product_des">
                                           <h6 className="product_name">Cycle</h6>
                                        </div>
                                     </div>
                                  </td>
                                  <td className="text_primary">accessories</td>
                                  <td>$30</td>
                                  <td>50</td>
                                  <td>In stock</td>
                                  <td className="actions">
                                     <div className="dropdown dropdown_wrapper ">
                                        <button className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACFSURBVEiJ7ZSxCYAwEEUfWmrhEilTuZMTGTdwB+dwB0FXsNHCiAFBIl4KSR78JnD//nHhICY00FtpafMSWIDNarZvYtSO+alaskHJkdqdoPApzD0brMAAVMAINMD0OmYUKKsgdFxLNtLmivs39Zokk07yBcOVvg3VJOiS/08614+kcx2OHQgqLpVdcUDeAAAAAElFTkSuQmCC" alt="Donts"/></button>
                                        <div className="dropdown-menu dropdown-menu-right  "><a className="dropdown-item" href="editproduct.html">Edit Product</a><button className="dropdown-item">Delete</button></div>
                                     </div>
                                  </td>
                               </tr>
                               <tr>
                                  <td><label className="checkbox_container text-uppercase">15</label></td>
                                  <td>
                                     <div className="media align-items-center">
                                        <div className="product_thumb"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiOwNou5C7xK-QTgFU571nfxaIN-fZUufFRJo3xVC2HgldN2_ddJ3pD11y_IHMAsrQ--M&amp;usqp=CAU" alt="Images"/></div>
                                        <div className="media-body product_des">
                                           <h6 className="product_name">Mens Track Pants</h6>
                                        </div>
                                     </div>
                                  </td>
                                  <td className="text_primary">cloths</td>
                                  <td>$30</td>
                                  <td>50</td>
                                  <td>In stock</td>
                                  <td className="actions">
                                     <div className="dropdown dropdown_wrapper ">
                                        <button className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACFSURBVEiJ7ZSxCYAwEEUfWmrhEilTuZMTGTdwB+dwB0FXsNHCiAFBIl4KSR78JnD//nHhICY00FtpafMSWIDNarZvYtSO+alaskHJkdqdoPApzD0brMAAVMAINMD0OmYUKKsgdFxLNtLmivs39Zokk07yBcOVvg3VJOiS/08614+kcx2OHQgqLpVdcUDeAAAAAElFTkSuQmCC" alt="Donts"/></button>
                                        <div className="dropdown-menu dropdown-menu-right  "><a className="dropdown-item" href="editproduct.html">Edit Product</a><button className="dropdown-item">Delete</button></div>
                                     </div>
                                  </td>
                               </tr>
                               <tr>
                                  <td><label className="checkbox_container text-uppercase">16</label></td>
                                  <td>
                                     <div className="media align-items-center">
                                        <div className="product_thumb"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEf8hy_B_09PewaRMGWXG5ET8W8ijCveJE2FF93X0xst9YzvVm_hxH-92UJL0YBJZL2TI&amp;usqp=CAU" alt="Images"/></div>
                                        <div className="media-body product_des">
                                           <h6 className="product_name">Cricket Bat</h6>
                                        </div>
                                     </div>
                                  </td>
                                  <td className="text_primary">accessories</td>
                                  <td>$30</td>
                                  <td>50</td>
                                  <td>In stock</td>
                                  <td className="actions">
                                     <div className="dropdown dropdown_wrapper ">
                                        <button className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACFSURBVEiJ7ZSxCYAwEEUfWmrhEilTuZMTGTdwB+dwB0FXsNHCiAFBIl4KSR78JnD//nHhICY00FtpafMSWIDNarZvYtSO+alaskHJkdqdoPApzD0brMAAVMAINMD0OmYUKKsgdFxLNtLmivs39Zokk07yBcOVvg3VJOiS/08614+kcx2OHQgqLpVdcUDeAAAAAElFTkSuQmCC" alt="Donts"/></button>
                                        <div className="dropdown-menu dropdown-menu-right  "><a className="dropdown-item" href="editproduct.html">Edit Product</a><button className="dropdown-item">Delete</button></div>
                                     </div>
                                  </td>
                               </tr>
                               <tr>
                                  <td><label className="checkbox_container text-uppercase">17</label></td>
                                  <td>
                                     <div className="media align-items-center">
                                        <div className="product_thumb"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG1kwoFQQCESpUyn0FytqnKWCzYAU1xom88VXh61n0DPK3kPqzKTZQXNf5ljd8N-0NMe8&amp;usqp=CAU" alt="Images"/></div>
                                        <div className="media-body product_des">
                                           <h6 className="product_name">Ear Buds</h6>
                                        </div>
                                     </div>
                                  </td>
                                  <td className="text_primary">electronics</td>
                                  <td>$30</td>
                                  <td>50</td>
                                  <td>In stock</td>
                                  <td className="actions">
                                     <div className="dropdown dropdown_wrapper ">
                                        <button className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACFSURBVEiJ7ZSxCYAwEEUfWmrhEilTuZMTGTdwB+dwB0FXsNHCiAFBIl4KSR78JnD//nHhICY00FtpafMSWIDNarZvYtSO+alaskHJkdqdoPApzD0brMAAVMAINMD0OmYUKKsgdFxLNtLmivs39Zokk07yBcOVvg3VJOiS/08614+kcx2OHQgqLpVdcUDeAAAAAElFTkSuQmCC" alt="Donts"/></button>
                                        <div className="dropdown-menu dropdown-menu-right  "><a className="dropdown-item" href="editproduct.html">Edit Product</a><button className="dropdown-item">Delete</button></div>
                                     </div>
                                  </td>
                               </tr>
                               <tr>
                                  <td><label className="checkbox_container text-uppercase">18</label></td>
                                  <td>
                                     <div className="media align-items-center">
                                        <div className="product_thumb"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-M1rQLo-NRXL3uMi2SDnT-ZGdYkJmUiAgXw&amp;usqp=CAU" alt="Images"/></div>
                                        <div className="media-body product_des">
                                           <h6 className="product_name">Guitar</h6>
                                        </div>
                                     </div>
                                  </td>
                                  <td className="text_primary">instrument</td>
                                  <td>$30</td>
                                  <td>50</td>
                                  <td>In stock</td>
                                  <td className="actions">
                                     <div className="dropdown dropdown_wrapper ">
                                        <button className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACFSURBVEiJ7ZSxCYAwEEUfWmrhEilTuZMTGTdwB+dwB0FXsNHCiAFBIl4KSR78JnD//nHhICY00FtpafMSWIDNarZvYtSO+alaskHJkdqdoPApzD0brMAAVMAINMD0OmYUKKsgdFxLNtLmivs39Zokk07yBcOVvg3VJOiS/08614+kcx2OHQgqLpVdcUDeAAAAAElFTkSuQmCC" alt="Donts"/></button>
                                        <div className="dropdown-menu dropdown-menu-right  "><a className="dropdown-item" href="editproduct.html">Edit Product</a><button className="dropdown-item">Delete</button></div>
                                     </div>
                                  </td>
                               </tr>
                               <tr>
                                  <td><label className="checkbox_container text-uppercase">19</label></td>
                                  <td>
                                     <div className="media align-items-center">
                                        <div className="product_thumb"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqaeWjDQZtXazlO8NCJtyBCfqOe4IwFjeAZw&amp;usqp=CAU" alt="Images"/></div>
                                        <div className="media-body product_des">
                                           <h6 className="product_name">Balzer</h6>
                                        </div>
                                     </div>
                                  </td>
                                  <td className="text_primary">cloths</td>
                                  <td>$30</td>
                                  <td>50</td>
                                  <td>In stock</td>
                                  <td className="actions">
                                     <div className="dropdown dropdown_wrapper ">
                                        <button className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACFSURBVEiJ7ZSxCYAwEEUfWmrhEilTuZMTGTdwB+dwB0FXsNHCiAFBIl4KSR78JnD//nHhICY00FtpafMSWIDNarZvYtSO+alaskHJkdqdoPApzD0brMAAVMAINMD0OmYUKKsgdFxLNtLmivs39Zokk07yBcOVvg3VJOiS/08614+kcx2OHQgqLpVdcUDeAAAAAElFTkSuQmCC" alt="Donts"/></button>
                                        <div className="dropdown-menu dropdown-menu-right  "><a className="dropdown-item" href="editproduct.html">Edit Product</a><button className="dropdown-item">Delete</button></div>
                                     </div>
                                  </td>
                               </tr>
                               <tr>
                                  <td><label className="checkbox_container text-uppercase">20</label></td>
                                  <td>
                                     <div className="media align-items-center">
                                        <div className="product_thumb"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpRR44VG9m9Y8mxwkOdDqNOZWce6hLQtW-TQ&amp;usqp=CAU" alt="Images"/></div>
                                        <div className="media-body product_des">
                                           <h6 className="product_name">Computer</h6>
                                        </div>
                                     </div>
                                  </td>
                                  <td className="text_primary">electronics</td>
                                  <td>$30</td>
                                  <td>50</td>
                                  <td>In stock</td>
                                  <td className="actions">
                                     <div className="dropdown dropdown_wrapper ">
                                        <button className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACFSURBVEiJ7ZSxCYAwEEUfWmrhEilTuZMTGTdwB+dwB0FXsNHCiAFBIl4KSR78JnD//nHhICY00FtpafMSWIDNarZvYtSO+alaskHJkdqdoPApzD0brMAAVMAINMD0OmYUKKsgdFxLNtLmivs39Zokk07yBcOVvg3VJOiS/08614+kcx2OHQgqLpVdcUDeAAAAAElFTkSuQmCC" alt="Donts"/></button>
                                        <div className="dropdown-menu dropdown-menu-right  "><a className="dropdown-item" href="editproduct.html">Edit Product</a><button className="dropdown-item">Delete</button></div>
                                     </div>
                                  </td>
                               </tr>
                               <tr>
                                  <td><label className="checkbox_container text-uppercase">21</label></td>
                                  <td>
                                     <div className="media align-items-center">
                                        <div className="product_thumb"><img src="https://rukminim1.flixcart.com/image/416/416/ki3gknk0/noodle/z/l/u/840-maggie-masala-noodles-12-instant-noodles-nestle-original-imafxym3qfnvhksa.jpeg?q=70" alt="Images"/></div>
                                        <div className="media-body product_des">
                                           <h6 className="product_name">Maggiee</h6>
                                        </div>
                                     </div>
                                  </td>
                                  <td className="text_primary">Grocery</td>
                                  <td>$30</td>
                                  <td>50</td>
                                  <td>In stock</td>
                                  <td className="actions">
                                     <div className="dropdown dropdown_wrapper ">
                                        <button className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACFSURBVEiJ7ZSxCYAwEEUfWmrhEilTuZMTGTdwB+dwB0FXsNHCiAFBIl4KSR78JnD//nHhICY00FtpafMSWIDNarZvYtSO+alaskHJkdqdoPApzD0brMAAVMAINMD0OmYUKKsgdFxLNtLmivs39Zokk07yBcOVvg3VJOiS/08614+kcx2OHQgqLpVdcUDeAAAAAElFTkSuQmCC" alt="Donts"/></button>
                                        <div className="dropdown-menu dropdown-menu-right  "><a className="dropdown-item" href="editproduct.html">Edit Product</a><button className="dropdown-item">Delete</button></div>
                                     </div>
                                  </td>
                               </tr>
                               <tr>
                                  <td><label className="checkbox_container text-uppercase">22</label></td>
                                  <td>
                                     <div className="media align-items-center">
                                        <div className="product_thumb"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1lGbgf3_sWfUBZCjITSGAfCzdcPzEeKbKqg&amp;usqp=CAU" alt="Images"/></div>
                                        <div className="media-body product_des">
                                           <h6 className="product_name">Mens shots</h6>
                                        </div>
                                     </div>
                                  </td>
                                  <td className="text_primary">cloths</td>
                                  <td>$30</td>
                                  <td>50</td>
                                  <td>In stock</td>
                                  <td className="actions">
                                     <div className="dropdown dropdown_wrapper ">
                                        <button className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACFSURBVEiJ7ZSxCYAwEEUfWmrhEilTuZMTGTdwB+dwB0FXsNHCiAFBIl4KSR78JnD//nHhICY00FtpafMSWIDNarZvYtSO+alaskHJkdqdoPApzD0brMAAVMAINMD0OmYUKKsgdFxLNtLmivs39Zokk07yBcOVvg3VJOiS/08614+kcx2OHQgqLpVdcUDeAAAAAElFTkSuQmCC" alt="Donts"/></button>
                                        <div className="dropdown-menu dropdown-menu-right  "><a className="dropdown-item" href="editproduct.html">Edit Product</a><button className="dropdown-item">Delete</button></div>
                                     </div>
                                  </td>
                               </tr>
                               <tr>
                                  <td><label className="checkbox_container text-uppercase">23</label></td>
                                  <td>
                                     <div className="media align-items-center">
                                        <div className="product_thumb"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQteLnvish69U_avVaG8ak8Pb4DoxXdfbX278sEsik-Eu553BX_po42ULDRTtj5iTuvSlk&amp;usqp=CAU" alt="Images"/></div>
                                        <div className="media-body product_des">
                                           <h6 className="product_name">samsung AC</h6>
                                        </div>
                                     </div>
                                  </td>
                                  <td className="text_primary">electronics</td>
                                  <td>$30</td>
                                  <td>50</td>
                                  <td>out of stock</td>
                                  <td className="actions">
                                     <div className="dropdown dropdown_wrapper ">
                                        <button className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACFSURBVEiJ7ZSxCYAwEEUfWmrhEilTuZMTGTdwB+dwB0FXsNHCiAFBIl4KSR78JnD//nHhICY00FtpafMSWIDNarZvYtSO+alaskHJkdqdoPApzD0brMAAVMAINMD0OmYUKKsgdFxLNtLmivs39Zokk07yBcOVvg3VJOiS/08614+kcx2OHQgqLpVdcUDeAAAAAElFTkSuQmCC" alt="Donts"/></button>
                                        <div className="dropdown-menu dropdown-menu-right  "><a className="dropdown-item" href="editproduct.html">Edit Product</a><button className="dropdown-item">Delete</button></div>
                                     </div>
                                  </td>
                               </tr>
                               <tr>
                                  <td><label className="checkbox_container text-uppercase">24</label></td>
                                  <td>
                                     <div className="media align-items-center">
                                        <div className="product_thumb"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQMg33iLtdKKMDfgleaz_4moJi3mN1Akyy02i6_tC2y9teTP4DPyzdEuUAiH9xMfDA5Rw&amp;usqp=CAU" alt="Images"/></div>
                                        <div className="media-body product_des">
                                           <h6 className="product_name">pen</h6>
                                        </div>
                                     </div>
                                  </td>
                                  <td className="text_primary">stationary</td>
                                  <td>$30</td>
                                  <td>5</td>
                                  <td>Limited stock</td>
                                  <td className="actions">
                                     <div className="dropdown dropdown_wrapper ">
                                        <button className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACFSURBVEiJ7ZSxCYAwEEUfWmrhEilTuZMTGTdwB+dwB0FXsNHCiAFBIl4KSR78JnD//nHhICY00FtpafMSWIDNarZvYtSO+alaskHJkdqdoPApzD0brMAAVMAINMD0OmYUKKsgdFxLNtLmivs39Zokk07yBcOVvg3VJOiS/08614+kcx2OHQgqLpVdcUDeAAAAAElFTkSuQmCC" alt="Donts"/></button>
                                        <div className="dropdown-menu dropdown-menu-right  "><a className="dropdown-item" href="editproduct.html">Edit Product</a><button className="dropdown-item">Delete</button></div>
                                     </div>
                                  </td>
                               </tr>
                               <tr>
                                  <td><label className="checkbox_container text-uppercase">25</label></td>
                                  <td>
                                     <div className="media align-items-center">
                                        <div className="product_thumb"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOKUQ5tlbIneiudCuZKHbRWSA9f5rNW4fhlQ&amp;usqp=CAU" alt="Images"/></div>
                                        <div className="media-body product_des">
                                           <h6 className="product_name">Coffee</h6>
                                        </div>
                                     </div>
                                  </td>
                                  <td className="text_primary">food product</td>
                                  <td>$30</td>
                                  <td>5</td>
                                  <td>In stock</td>
                                  <td className="actions">
                                     <div className="dropdown dropdown_wrapper ">
                                        <button className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACFSURBVEiJ7ZSxCYAwEEUfWmrhEilTuZMTGTdwB+dwB0FXsNHCiAFBIl4KSR78JnD//nHhICY00FtpafMSWIDNarZvYtSO+alaskHJkdqdoPApzD0brMAAVMAINMD0OmYUKKsgdFxLNtLmivs39Zokk07yBcOVvg3VJOiS/08614+kcx2OHQgqLpVdcUDeAAAAAElFTkSuQmCC" alt="Donts"/></button>
                                        <div className="dropdown-menu dropdown-menu-right  "><a className="dropdown-item" href="editproduct.html">Edit Product</a><button className="dropdown-item">Delete</button></div>
                                     </div>
                                  </td>
                               </tr>
                               <tr>
                                  <td><label className="checkbox_container text-uppercase">26</label></td>
                                  <td>
                                     <div className="media align-items-center">
                                        <div className="product_thumb"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPG2xShjUnLH59LjjykylM0rvUY2qBfKzEWQ&amp;usqp=CAU" alt="Images"/></div>
                                        <div className="media-body product_des">
                                           <h6 className="product_name">Water Heater</h6>
                                        </div>
                                     </div>
                                  </td>
                                  <td className="text_primary">electronics</td>
                                  <td>$30</td>
                                  <td>5</td>
                                  <td>In stock</td>
                                  <td className="actions">
                                     <div className="dropdown dropdown_wrapper ">
                                        <button className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACFSURBVEiJ7ZSxCYAwEEUfWmrhEilTuZMTGTdwB+dwB0FXsNHCiAFBIl4KSR78JnD//nHhICY00FtpafMSWIDNarZvYtSO+alaskHJkdqdoPApzD0brMAAVMAINMD0OmYUKKsgdFxLNtLmivs39Zokk07yBcOVvg3VJOiS/08614+kcx2OHQgqLpVdcUDeAAAAAElFTkSuQmCC" alt="Donts"/></button>
                                        <div className="dropdown-menu dropdown-menu-right  "><a className="dropdown-item" href="editproduct.html">Edit Product</a><button className="dropdown-item">Delete</button></div>
                                     </div>
                                  </td>
                               </tr>
                               <tr>
                                  <td><label className="checkbox_container text-uppercase">27</label></td>
                                  <td>
                                     <div className="media align-items-center">
                                        <div className="product_thumb"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmsu0QNjSs7ZUVU9yX9d74--GBZQpvwrjoKN_9rgaCWXmKWx_t0SonkY6vq5EfhuxHCCk&amp;usqp=CAU" alt="Images"/></div>
                                        <div className="media-body product_des">
                                           <h6 className="product_name">Office chair</h6>
                                        </div>
                                     </div>
                                  </td>
                                  <td className="text_primary">furniture</td>
                                  <td>$30</td>
                                  <td>5</td>
                                  <td>In stock</td>
                                  <td className="actions">
                                     <div className="dropdown dropdown_wrapper ">
                                        <button className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACFSURBVEiJ7ZSxCYAwEEUfWmrhEilTuZMTGTdwB+dwB0FXsNHCiAFBIl4KSR78JnD//nHhICY00FtpafMSWIDNarZvYtSO+alaskHJkdqdoPApzD0brMAAVMAINMD0OmYUKKsgdFxLNtLmivs39Zokk07yBcOVvg3VJOiS/08614+kcx2OHQgqLpVdcUDeAAAAAElFTkSuQmCC" alt="Donts"/></button>
                                        <div className="dropdown-menu dropdown-menu-right  "><a className="dropdown-item" href="editproduct.html">Edit Product</a><button className="dropdown-item">Delete</button></div>
                                     </div>
                                  </td>
                               </tr>
                               <tr>
                                  <td><label className="checkbox_container text-uppercase">28</label></td>
                                  <td>
                                     <div className="media align-items-center">
                                        <div className="product_thumb"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUowKMcXiXgfkndm3REnRkJ-NQbfZZ-ohzJg&amp;usqp=CAU" alt="Images"/></div>
                                        <div className="media-body product_des">
                                           <h6 className="product_name">One plus 7</h6>
                                        </div>
                                     </div>
                                  </td>
                                  <td className="text_primary">electronics</td>
                                  <td>$30</td>
                                  <td>5</td>
                                  <td>In stock</td>
                                  <td className="actions">
                                     <div className="dropdown dropdown_wrapper ">
                                        <button className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACFSURBVEiJ7ZSxCYAwEEUfWmrhEilTuZMTGTdwB+dwB0FXsNHCiAFBIl4KSR78JnD//nHhICY00FtpafMSWIDNarZvYtSO+alaskHJkdqdoPApzD0brMAAVMAINMD0OmYUKKsgdFxLNtLmivs39Zokk07yBcOVvg3VJOiS/08614+kcx2OHQgqLpVdcUDeAAAAAElFTkSuQmCC" alt="Donts"/></button>
                                        <div className="dropdown-menu dropdown-menu-right  "><a className="dropdown-item" href="editproduct.html">Edit Product</a><button className="dropdown-item">Delete</button></div>
                                     </div>
                                  </td>
                               </tr>
                               <tr>
                                  <td><label className="checkbox_container text-uppercase">29</label></td>
                                  <td>
                                     <div className="media align-items-center">
                                        <div className="product_thumb"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQrwvfWMVmss0mglRIV39LVu3VbpSRs9vN-w&amp;usqp=CAU" alt="Images"/></div>
                                        <div className="media-body product_des">
                                           <h6 className="product_name">Samsung Tab</h6>
                                        </div>
                                     </div>
                                  </td>
                                  <td className="text_primary">electronics</td>
                                  <td>$30</td>
                                  <td>5</td>
                                  <td>In stock</td>
                                  <td className="actions">
                                     <div className="dropdown dropdown_wrapper ">
                                        <button className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACFSURBVEiJ7ZSxCYAwEEUfWmrhEilTuZMTGTdwB+dwB0FXsNHCiAFBIl4KSR78JnD//nHhICY00FtpafMSWIDNarZvYtSO+alaskHJkdqdoPApzD0brMAAVMAINMD0OmYUKKsgdFxLNtLmivs39Zokk07yBcOVvg3VJOiS/08614+kcx2OHQgqLpVdcUDeAAAAAElFTkSuQmCC" alt="Donts"/></button>
                                        <div className="dropdown-menu dropdown-menu-right  "><a className="dropdown-item" href="editproduct.html">Edit Product</a><button className="dropdown-item">Delete</button></div>
                                     </div>
                                  </td>
                               </tr>
                               <tr>
                                  <td><label className="checkbox_container text-uppercase">30</label></td>
                                  <td>
                                     <div className="media align-items-center">
                                        <div className="product_thumb"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoJuuKlR_mM2jbsTciQ9qx4c19IV7b9HUPkQ&amp;usqp=CAU" alt="Images"/></div>
                                        <div className="media-body product_des">
                                           <h6 className="product_name">Dairy milk</h6>
                                        </div>
                                     </div>
                                  </td>
                                  <td className="text_primary">chocalates</td>
                                  <td>$30</td>
                                  <td>5</td>
                                  <td>In stock</td>
                                  <td className="actions">
                                     <div className="dropdown dropdown_wrapper ">
                                        <button className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACFSURBVEiJ7ZSxCYAwEEUfWmrhEilTuZMTGTdwB+dwB0FXsNHCiAFBIl4KSR78JnD//nHhICY00FtpafMSWIDNarZvYtSO+alaskHJkdqdoPApzD0brMAAVMAINMD0OmYUKKsgdFxLNtLmivs39Zokk07yBcOVvg3VJOiS/08614+kcx2OHQgqLpVdcUDeAAAAAElFTkSuQmCC" alt="Donts"/></button>
                                        <div className="dropdown-menu dropdown-menu-right  "><a className="dropdown-item" href="editproduct.html">Edit Product</a><button className="dropdown-item">Delete</button></div>
                                     </div>
                                  </td>
                               </tr>
                               <tr>
                                  <td><label className="checkbox_container text-uppercase">31</label></td>
                                  <td>
                                     <div className="media align-items-center">
                                        <div className="product_thumb"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZQDrxzAIOJUQorkS_zn__QA50Zi6jlKc1HQ&amp;usqp=CAU" alt="Images"/></div>
                                        <div className="media-body product_des">
                                           <h6 className="product_name">saree</h6>
                                        </div>
                                     </div>
                                  </td>
                                  <td className="text_primary">cloths</td>
                                  <td>$30</td>
                                  <td>5</td>
                                  <td>Limited stock</td>
                                  <td className="actions">
                                     <div className="dropdown dropdown_wrapper ">
                                        <button className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACFSURBVEiJ7ZSxCYAwEEUfWmrhEilTuZMTGTdwB+dwB0FXsNHCiAFBIl4KSR78JnD//nHhICY00FtpafMSWIDNarZvYtSO+alaskHJkdqdoPApzD0brMAAVMAINMD0OmYUKKsgdFxLNtLmivs39Zokk07yBcOVvg3VJOiS/08614+kcx2OHQgqLpVdcUDeAAAAAElFTkSuQmCC" alt="Donts" /></button>
                                        <div className="dropdown-menu dropdown-menu-right  "><a className="dropdown-item" href="editproduct.html">Edit Product</a><button className="dropdown-item">Delete</button></div>
                                     </div>
                                  </td>
                               </tr>
  </tbody>*/}
  <tbody>
     {searchData.length !=0?searchData.map((product,index)=>{


      return(
         <tr key={index}>
         <td><label className="checkbox_container text-uppercase">{product.checkbox}</label></td>
         <td>
            <div className="media align-items-center">
               <div className="product_thumb"><img src={product.image} alt="Images"/></div>
               <div className="media-body product_des">
                  <h6 className="product_name">{product.name}</h6>
               </div>
            </div>
         </td>
         <td className="text_primary">{product.category}</td>
         <td>{product.price}</td>
         <td>{product.variants.length}</td>
         <td>{product.status}</td>
         <td className="actions">
            <Action product={product}/>
         </td>
      </tr>

      )
     }):<tr><td colSpan={7}>No product in  list</td></tr>}
  
  
  </tbody>
                         </table>
                      </div>
                   </div>
                </div>
             </div>
          </div>
  )
}

export default ProductList

