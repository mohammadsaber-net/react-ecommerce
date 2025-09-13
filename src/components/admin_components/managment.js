import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../redux-tool/slice-product";
import { Button } from "react-bootstrap";
import { deleteProduct, resetDeleteProduct } from "../../redux-tool/slice-deleteProduct";
import Form from "./form";
import Spinner from "../spinner&slider/spinner";
import { fetchOneProduct, resetAddOneProduct } from "../../redux-tool/slice-one-product";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
function Managment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [actionType, setActionType] = useState('Add New Product');
  const allProducts = useSelector((state) => state.products);
  const oneProduct = useSelector((state) => state.oneProduct);
  const deleteProductState=useSelector(state=>state.deleteProduct);
  const login=useSelector(state=>state.adminLogin.userInfo)
  const [managment,setManagment]=useState(false)
  useEffect(()=>{
    dispatch(resetAddOneProduct())
      const admin = localStorage.getItem('token');
      if (admin) {
        try {
          const decodedToken = jwtDecode(admin);
          if (decodedToken.exp * 1000 < Date.now()) {
            localStorage.removeItem("token");
            setManagment(false);
            navigate("/login");
            toast.error("Session expired. Please log in again.");
            return;
          }
          if (decodedToken.role === 'ADMIN') {
            setManagment(true);
          }else{
            navigate("/")
            setManagment(false);
          }
        } catch (error) {
          navigate("/")
          setManagment(false);
          console.error("Failed to decode token:", error);
        }
      }else{
        navigate("/")
        setManagment(false);
      }
    }, [login]);
  const deletion = (id) => {
    dispatch(deleteProduct(id));
  };

  const getOneProduct = (id) => {
    dispatch(fetchOneProduct(id));
  };
    useEffect(() =>{ 
    if(managment) {
      dispatch(fetchProduct())
    };
  }, [dispatch,deletion,showForm]);
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
        {managment && <div className="container mt-80">
            {allProducts.length===0 && <Spinner />}
            {showForm && <Form action={actionType} setShowForm={setShowForm} product={oneProduct?oneProduct:{}} />}
            <h2 className="mb-4">Product Management</h2>
            <Button variant="outline-success" className="mb-3" onClick={() => { setShowForm(true); setActionType("Add New Product"); }}>Add New Product</Button>
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
                            <td><img style={{ width: "50px", height: "50px" }} src={`https://ecommerce-back-pys6.onrender.com/images/${product.image}`} alt={product.title} /></td>
                            <td>{product.title}</td>
                            <td>{product.category}</td>
                            <td ><div className="description">{product.description}</div></td>
                            <td>
                                <button onClick={() => { setShowForm(true); setActionType("Update Product"); getOneProduct(product._id) }} className="btn btn-outline-primary d-block mb-2">Update</button>
                                <button onClick={() => deletion(product._id)} className="btn btn-outline-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>}
        </>
    )
}
export default Managment