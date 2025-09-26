import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../redux-tool/slice-product";
import { Button } from "react-bootstrap";
import { deleteProduct, resetDeleteProduct } from "../../redux-tool/slice-deleteProduct";
import Form from "./form";
import Spinner from "../spinner&slider/spinner";
import { fetchOneProduct, resetAddOneProduct } from "../../redux-tool/slice-one-product";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Managment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [actionType, setActionType] = useState('Add New Product');
  const allProducts = useSelector((state) => state.products);
  const oneProduct = useSelector((state) => state.oneProduct);
  const deleteProductState=useSelector(state=>state.deleteProduct);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const deletion = (id) => {
    dispatch(deleteProduct(id));
  };

  const getOneProduct = (id) => {
    setLoadingProductId(id);
  dispatch(fetchOneProduct(id)).then(() => {
    setLoadingProductId(null);
  });
  };
    useEffect(() =>{ 
      dispatch(fetchProduct())
  }, [dispatch,deletion,showForm]);
  // 
  useEffect(()=>{
    if(deleteProductState.product==="DELETED"){
      dispatch(resetDeleteProduct())
      
      toast.success("product deleted")
    }else if(deleteProductState.product==="NOT DELETED"){
      dispatch(resetDeleteProduct())
      toast.error("failed to delete product")
    }
  },[deleteProductState.product])

    return (
        <>
        <div className="container mt-80">
            {allProducts.length===0 && <Spinner />}
            {showForm && (actionType === "Add New Product" || oneProduct.loading)&& <Form action={actionType} setShowForm={setShowForm} product={oneProduct?oneProduct:{}} />}
            <h2 className="mb-4">Product Management</h2>
            <Button variant="outline-success" className="mb-3" onClick={() => {  dispatch(resetAddOneProduct()); setActionType("Add New Product");setShowForm(true)}}>Add New Product</Button>
            <div className="holder">
              <table className="table manage-table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Category</th>
                        <th scope="col">Description</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allProducts.map(product => (
                        <tr key={product._id}>
                            <td><img style={{ width: "50px", height: "50px" }} src={product.image} alt={product.title} /></td>
                            <td>{product.title}</td>
                            <td>{product.category}</td>
                            <td ><div className="description">{product.description}</div></td>
                            <td>
                                <button onClick={() => { setShowForm(true);setActionType("Update Product"); getOneProduct(product._id) }} className="btn btn-primary d-block mb-2">{loadingProductId===product._id?<div className="d-flex align-items-center"><span className="Submit-loading"></span></div>:"Update"}</button>
                                <button onClick={() => deletion(product._id)} className="btn btn-outline-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div> 
        </div>
        </>
    )
}
export default Managment