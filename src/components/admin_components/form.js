import { useDispatch, useSelector } from "react-redux"
import "./managment.css"
import { resetUpdateProduct, updateProduct } from "../../redux-tool/slice-updateProduct"
import { useForm } from "react-hook-form"
import { addProductSchema } from "../validations-constant"
import { yupResolver } from "@hookform/resolvers/yup"
import { addProduct, resetAddProduct } from "../../redux-tool/slice-addProduct"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
function Form(params){
    const dispatch=useDispatch()
    const addProductState=useSelector(state=>state.addproduct )
    const updateProductState=useSelector(state=>state.updateProduct)
    useEffect(()=>{
    if(updateProductState.product?.status==="SUCCESS"){
        dispatch(resetUpdateProduct())
        params.setShowForm(false)
        toast.success("product updated")
    }else if(updateProductState.product?.status ==="FAIL" || updateProductState.product?.status ==="ERROR"){
        dispatch(resetUpdateProduct())
        toast.error("failed to update product")
    }
    if(addProductState.product ==="FAIL" || addProductState.product ==="ERROR"){
        dispatch(resetAddProduct())
        toast.error("failed to add product")
    }else if(addProductState.product?.status ==="SUCCESS"){
        dispatch(resetAddProduct())
        params.setShowForm(false)
        toast.success("product added")

    }
    },[updateProductState.product,addProductState])
    const {
            register,
            handleSubmit,
            formState:{errors,isValid}
        }=useForm({
            resolver:yupResolver(addProductSchema),
            mode:'all'
        })
        const [image,setImage]=useState(null)
        const [close,setClose]=useState(false)
        const product=params.product
        const submitForm = (data) => {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("price", data.price);
            formData.append("description", data.description);
            formData.append("category", data.category);
            formData.append("image", data.image[0]);
            if(params.action==="Add New Product"){
                dispatch(addProduct(formData))
            }else{
                dispatch(updateProduct({formData, id: params.product._id}));
            }
        };
        return(
        <div className="form-container">
        <form onSubmit={handleSubmit(submitForm)} className="form">
            {!product.title && params.action !== "Add New Product" && <div className="overlay"><span></span></div>}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="form-title">{params.action}</h2>
                <div className="close-button" onClick={() => params.setShowForm(false)}>X</div>
            </div>
            <div className="form-group">
                <label htmlFor="productName">Product Name</label>
                <input {...register("title")} type="text" id="productName" defaultValue={product.title} className="form-control" />
                {errors.title&&<small className="d-block text-danger">{errors.title.message}</small>}
            </div>
            <div className="form-group">
                <label htmlFor="productPrice">Product Price</label>
                <input {...register("price")} type="text" id="productPrice" defaultValue={product.price} className="form-control" />
                {errors.price&&<small className="d-block text-danger">{errors.price.message}</small>}
            </div>
            <div className="form-group">
                <label htmlFor="productCategory">Category</label>
                <select {...register("category")} id="productCategory" defaultChecked={product.category} className="form-control">
                    <option value="men's clothing">men's clothing</option>
                    <option value="women's clothing">women's clothing</option>
                    <option value="jewelery">jewelery</option>
                    <option selected value="electronics">electronics</option>
                </select>
                {/* <input {...register("category")} type="text" id="productCategory" defaultValue={product.category} className="form-control" /> */}
                {errors.category&&<small className="d-block text-danger">{errors.category.message}</small>}
            </div>
            <div className="form-group">
                <label htmlFor="productDescription">Description</label>
                <textarea {...register("description")} id="productDescription" defaultValue={product.description} className="form-control"></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="productImage">Image URL</label>
                <div className="d-flex align-items-center justify-content-between gap-1">
                    <input {...register("image")} type="file" onChange={(event)=>setImage(event.target.files[0])} id="productImage" className="form-control" />
                    <img style={{width:"90px",height:"70px"}} src={image?URL.createObjectURL(image):`https://ecommerce-back-pys6.onrender.com/images/${product.image}`} alt={"selected image"} />
                </div>
                {errors.image&&<small className="d-block text-danger">{errors.image.message}</small>}
            </div>
           <div className="d-flex justify-content-between">
             <button onClick={()=>setClose(true)} disabled={!isValid} type="submit" className="btn btn-success mt-2">{params.action}</button>
           </div>
            {(updateProductState?.loading||addProductState?.loading) &&<div className="overlay"><span></span></div>}
        </form>
        </div>
    )
}
export default Form