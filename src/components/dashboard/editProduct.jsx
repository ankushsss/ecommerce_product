import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import image from "../../assets/images/thumbnails/picture.svg";

const VariantForm = ({ variant, variants, setVariants, index }) => {
  const [singleVariant, setSingleVariant] = useState(variant);

  useEffect(() => {
   
  }, [singleVariant]);

  return (
    <div key={index}>
      <div className="">
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label for=" productName">
                <span className="text-danger">*</span> Variant
              </label>
              <input
                type="text"
                name="variant"
                className="form-control"
                id="variant"
                onChange={(e) => {
                  setSingleVariant(e.target.value);
                  variants[index].variant = e.target.value;

                  setVariants([...variants]);
                }}
                value={singleVariant.variant}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label for=" productName">
                <span className="text-danger">*</span> Price
              </label>
              <input
                type="text"
                name="price"
                className="form-control"
                id="price"
                onChange={(e) => {
                  setSingleVariant(e.target.value);
                  variants[index].price = e.target.value;

                  setVariants([...variants]);
                }}
                value={singleVariant.price}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label for=" productName">
                <span className="text-danger">*</span> Stock keeping unit
              </label>
              <input
                type="text"
                name="variantPrice"
                className="form-control"
                id="productName"
                onChange={(e) => {
                  setSingleVariant(e.target.value);
                  variants[index].stock = e.target.value;

                  setVariants([...variants]);
                }}
                value={singleVariant.stock}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="form-group uploader-wrapper">
        <label for="Description">
          <span className="text-danger">*</span> Upload Image
        </label>
        <div className="uploader-wrapper-inner">
          <img src={image} alt="pictures" />
          <input type="file" />
          Click or drag file to upload
        </div>
      </div>
    </div>
  );
};

const EditProduct = () => {
  const [active, setActive] = useState("general");
  const { id } = useParams();
  const [product, setProduct] = useState(
    JSON.parse(localStorage.getItem("products"))[id - 1]
  );
  const [variants, setVariants] = useState(
    JSON.parse(localStorage.getItem("products"))[id - 1].variation
  );

  useEffect(() => {
    setProduct(JSON.parse(localStorage.getItem("products"))[id - 1]);
    setVariants(JSON.parse(localStorage.getItem("products"))[id - 1].variation);
  }, []);

  const formik = useFormik({
    initialValues: {
      id: product.id ? product.id : "",
      productImage: product.productImage ? product.productImage : "",
      productName: product.productName ? product.productName : "",
      category: product.category ? product.category : "",
      price: product.price ? product.price : "",
      description: product.description ? product.description : "",
      compare:product.compare ? product.compare : "",
      costperitem:  product.costperitem ? product.costperitem :"",
      taxrate:  product.taxrate ? product.taxrate :"",
      status:product.status ? product.status : "",
      variation: product.variation ? product.variation : [],
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values, "the");
      let data = JSON.parse(localStorage.getItem("products"))
        ? JSON.parse(localStorage.getItem("products"))
        : [];
      data[id - 1] = {
        id: values.id,
        productImage: values.productImage,
        productName: values.productName,
        category: values.category,
        description: values.description,
        price: values.price,
        compare: values.compare,
        costperitem: values.costperitem,
        taxrate: values.taxrate,
        quantity: values.quantity,
        status: values.status,
        variation: variants,
      };
      localStorage.setItem("products", JSON.stringify(data));
      alert("Data updated Successfully");
    },
    validate: (values) => {
      let errors = {};
      if (!values.productName) {
        errors.productName = "This is a required field";
      }
      if (!values.description) {
        errors.description = "Description required";
      }
      if (!values.price) {
        errors.price = "Price required";
      }
      if (!values.category) {
        errors.category = "Please Select Category";
      }
      if (!values.status) {
        errors.status = "Please Select Status";
      }
      if (!values.costperitem) {
        errors.costperitem = "Please Select Status";
      }
      if (!values.compare) {
        errors.compare = "Please Select compareprice";
      }
      if (!values.taxrate) {
        errors.taxrate = "Please Select taxrate";
      }
      
      return errors;
    },
  });

  return (
    <div className="content-area-wrapper" style={{ textAlign: "left" }}>
      <div className="content-area-wrapper">
        <div className="content-wrapper">
          <div className="filter_wrapper  d-block d-sm-none">
            <div className="filet_left_content">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAABHNCSVQICAgIfAhkiAAAAXtJREFUOE+tVEFOwkAU7e8Q1yyNmFhv0Ih7yg1acW89AXADj1BOYN2D9gaUPZjeABZiXLI2DOObZmiGwSKGTjJpZ/6819f/3x+yjHHu+g6r1bpCCA8hV4UzIkr5ej34ypKFidmuSQ80mp1IWFYXey+YiU20kvGNEHU8fMwHkEbL6bD/G2FBdtHsZDmQc7/s61K1zViCY/PP2SgwCXMypcg749xbZEmupmw4rl//ZiwFMF3ORj39HKmvzaHo+lA+dFAZhpSqOmSHhxSZMaQlhrqVro5Urp5AJnNx9ADOJyF6y/dXr6gmNgWq1v6YDtOjmXDw8vbeQ5XHEFEUUSqrlExaoprfrLQAlVpDM20Lpm0fadoxsj7ZM+22giiEtMYVzBv80U5vOOfCFo+wRbzTAfpCa/TYIko2qtFt2ehCyEYPoWiA90wQPZuEO7eGJM6vIMZ6ALgAtOQeQBOQZ5zzaKu6cXMXmoR7ZP8xrkl4EllePKUQr8HJZAWhbTs/jATsJjmQpCoAAAAASUVORK5CYII="
                      alt="search"
                    />
                  </span>
                </div>
                <input
                  type="text"
                  value={product.id}
                  className="form-control input_modify"
                  placeholder="Search"
                />
              </div>
            </div>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="card nav_pills_card nav_pills_card_new">
              <div className="card-body">
                <div className="heading_wrapper heading_right_content">
                  <h1 className="head_title">Add Product</h1>
                  <div className="btn_wrapper">
                    <button
                      type="button"
                      className="theme-btn btn-outline-secondary"
                    >
                      Discard
                    </button>
                    <input
                      className="theme-btn theme-btn-primary"
                      type="submit"
                      value="update"
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.email}
                      </div>
                    ) : null}
                  </div>
                </div>
                <ul
                  className="nav nav-pills mb-0 nav_pills_wrapper"
                  id="pills-tab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className={
                        active == "general" ? "nav-link active" : "nav-link "
                      }
                      id="pills-general-tab"
                      data-toggle="pill"
                      data-target="#pills-general"
                      type="button"
                      role="tab"
                      aria-controls="pills-general"
                      aria-selected={active == "general" ? "true" : "false"}
                      onClick={() => setActive("general")}
                    >
                      General
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={
                        active == "variation" ? "nav-link active" : "nav-link "
                      }
                      id="pills-variation-tab"
                      data-toggle="pill"
                      data-target="#pills-variation"
                      type="button"
                      role="tab"
                      aria-controls="pills-variation"
                      aria-selected={active == "variation" ? "true" : "false"}
                      onClick={() => setActive("variation")}
                    >
                      Variation
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="tab-content" id="pills-tabContent">
              <div
                className={
                  active == "general"
                    ? "tab-pane fade show active"
                    : "tab-pane fade show"
                }
                id="pills-general"
                role="tabpanel"
                aria-labelledby="pills-general-tab"
              >
                <div className="card nav_pills_card">
                  <div className="card-body">
                    <div>
                      <div className="form-title">Basic Info</div>
                      <div className="form-group">
                        <label for="productName">
                          <span className="text-danger">*</span> Product Name
                        </label>
                        <input
                          type="text"
                          name="productName"
                          className="form-control"
                          id="name"
                          onChange={formik.handleChange}
                          value={formik.values.productName}
                        />
                        {formik.touched.productName && formik.errors.productName ? (
                          <div style={{ color: "red", fontSize: "12px" }}>
                            {formik.errors.productName}
                          </div>
                        ) : null}
                      </div>
                      <div className="form-group">
                        <label for="Description">
                          <span className="text-danger">*</span> Description
                        </label>
                        <textarea
                          type="text"
                          id="Description"
                          className="form-control"
                          name="description"
                          onChange={formik.handleChange}
                          rows="3"
                          value={formik.values.description}
                        >
                          
                        </textarea>
                        {formik.touched.description &&
                          formik.errors.description ? (
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {formik.errors.description}
                            </div>
                          ) : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card nav_pills_card">
                  <div className="card-body">
                    <div>
                      <div className="form-title">Pricing</div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label for="price">
                              <span className="text-danger">*</span> Price
                            </label>
                            <input
                              type="text"
                              name="price"
                              className="form-control"
                              id="price"
                              onChange={formik.handleChange}
                              value={formik.values.price}
                            />
                          
                          </div>
                          {formik.touched.price && formik.errors.price ? (
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {formik.errors.price}
                            </div>
                          ) : null}
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label for="comparePrice">
                              <span className="text-danger">*</span> Compare
                              price
                            </label>
                            <input
                              type="text"
                              name="compare"
                              className="form-control"
                              id="comparePrice"
                              onChange={formik.handleChange}
                              value={formik.values.compare}
                            />
                         
                          </div>
                          {formik.touched.compare &&
                            formik.errors.compare ? (
                              <div style={{ color: "red", fontSize: "12px" }}>
                                {formik.errors.compare}
                              </div>
                            ) : null}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label for=" costPerItem">
                              <span className="text-danger">*</span> Cost per
                              item
                            </label>
                            <input
                              type="text"
                              name="costperitem"
                              className="form-control"
                              id="costperitem"
                              onChange={formik.handleChange}
                              value={formik.values.costperitem}
                            />
                            {formik.touched.costperitem &&
                            formik.errors.costperitem ? (
                              <div style={{ color: "red", fontSize: "12px" }}>
                                {formik.errors.costperitem}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label for="taxRate">
                              <span className="text-danger">*</span> Tax rate
                            </label>
                            <input
                              type="text"
                              name="taxrate"
                              className="form-control"
                              id="taxRate"
                              onChange={formik.handleChange}
                              value={formik.values.taxrate}
                            />
                            {formik.touched.taxrate && formik.errors.taxrate ? (
                              <div style={{ color: "red", fontSize: "12px" }}>
                                {formik.errors.taxrate}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card nav_pills_card">
                  <div className="card-body">
                    <div>
                      <div className="form-title">Organization</div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label for="productName">
                              <span className="text-danger">*</span> Category
                            </label>
                            <select
                              onChange={formik.handleChange}
                              value={formik.values.category}
                              name="category"
                              className="form-control"
                              id="productName"
                            >
                              <option value="">Select</option>
                              <option value="clothe">Cloths</option>
                              <option value="bags">Bags</option>
                              <option value="shoes">Shoes</option>
                              <option value="watches">Watches</option>
                              <option value="device">Device</option>
                            </select>
                            {formik.touched.category &&
                            formik.errors.category ? (
                              <div style={{ color: "red", fontSize: "12px" }}>
                                {formik.errors.category}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label for="Description">
                              <span className="text-danger">*</span> Status
                            </label>
                            <select
                              className="form-control"
                              name="status"
                              id="productName"
                              onChange={formik.handleChange}
                              value={formik.values.status}
                            >
                              <option value="">Select</option>
                              <option value="In stock">In stock</option>
                              <option value="Limited stock">
                                Limited stock
                              </option>
                              <option value="Out of stock">Out of stock</option>
                            </select>
                            {formik.touched.status && formik.errors.status ? (
                              <div style={{ color: "red", fontSize: "12px" }}>
                                {formik.errors.status}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={
                  active == "variation"
                    ? "tab-pane fade show active"
                    : "tab-pane fade show"
                }
                id="pills-variation"
                role="tabpanel"
                aria-labelledby="pills-variation-tab"
              >
                <div className="card nav_pills_card">
                  <div className="card-body">
                    <div>
                      <div className="form-title">Variants</div>
                      <p>
                        Add A Custome Variat Options For Your Product, Like
                        Different Sizes Or Colors.
                      </p>
                      {variants.map((data, index) => {
                        return (
                          <VariantForm
                            variant={data}
                            index={index}
                            variants={variants}
                            setVariants={setVariants}
                          />
                        );
                      })}

                      <button
                        onClick={() => {
                          variants.push({
                            Variant: "Black",
                            Price: "$10",
                            Stockkeepingunit: "10",
                          });

                          setVariants([...variants]);
                        }}
                        className="uploader-add-btne"
                        type="button"
                      >
                        Add field
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
// onClick={()=>fomik.values.variant.push}
