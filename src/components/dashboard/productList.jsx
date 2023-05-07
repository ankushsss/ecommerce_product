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
      return product.id != indexValue
   })
   setProducts([...newProductList])
   setSearchData([...newProductList])
   localStorage.setItem('products',JSON.stringify(newProductList))
}
const Action = ({product})=>{
   const [open,setOpen] = useState(false)

   return(<div className={open?"dropdown dropdown_wrapper show":"dropdown dropdown_wrapper "}>
   <button onClick={()=>setOpen(!open)} className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACFSURBVEiJ7ZSxCYAwEEUfWmrhEilTuZMTGTdwB+dwB0FXsNHCiAFBIl4KSR78JnD//nHhICY00FtpafMSWIDNarZvYtSO+alaskHJkdqdoPApzD0brMAAVMAINMD0OmYUKKsgdFxLNtLmivs39Zokk07yBcOVvg3VJOiS/08614+kcx2OHQgqLpVdcUDeAAAAAElFTkSuQmCC" alt="Donts"/></button>
   <div className={open?"dropdown-menu dropdown-menu-right show ":"dropdown-menu dropdown-menu-right "}><Link className="dropdown-item" to={`/dashboard/editProduct/${product.id}`}>Edit Product</Link><button onClick={()=>deleteProduct(product.id)} className="dropdown-item">Delete</button></div>
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
                                <option value="clothe">Clothe</option>
                                <option value="bags">Bags</option>
                                <option value="shoes">Shoes</option>
                                <option value="watches">Watches</option>
                                <option value="device">Devices</option>
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

  <tbody>
     {searchData.length !=0?searchData.map((product,index)=>{


      return(
         <tr key={index}>
         <td><label className="checkbox_container text-uppercase">{product.id}</label></td>
         <td>
            <div className="media align-items-center">
               <div className="product_thumb"><img src={product.productImage} alt="Images"/></div>
               <div className="media-body product_des">
                  <h6 className="product_name">{product.productName}</h6>
               </div>
            </div>
         </td>
         <td className="text_primary">{product.category}</td>
         <td>{product.price}</td>
         <td>{product.variation.length}</td>
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

