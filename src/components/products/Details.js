import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { fetchOneProduct} from "../../redux-tool/slice-one-product";
import { Container } from "react-bootstrap";
import "./details.css"
import Spinner from "../spinner&slider/spinner";
import { toast } from "react-toastify";

function Details(){
    let dispatch=useDispatch()
    let navigate =useNavigate()
    let products=useSelector(state=>state.oneProduct)
    let product=products.product?.data.product
    useEffect(()=>{
        if(products.product?.status==="FAIL"|| products.product?.status==="ERROR"){
            toast.error(`failed to get product due to ${products.product.message || undefined}`)
            navigate("/")
        }
    },[products.product])
    let id=useParams().Id
    useEffect(()=>{
        if(id){
            dispatch(fetchOneProduct(id))
        }
    },[])
    
    return(
        <>
        {!products.loading && <Spinner />}
        <Container className="product-details mt-80">
            {product&&<div className="d-flex justify-content-center flex-column align-items-center flex-sm-row align-items-sm-start">
            <Link to={"/"} className="btn btn-outline-primary">back to products page</Link>
            <div  className="details-box">
                <img src={product.image} alt={products.title} />
            <div className="info">
                <h3 className="text-primary">{product.title}</h3>
                <p className="text-dark">{product.description}</p>
                   
                <div className="price-rate">
                    <span>price: {product.price} $</span>
                </div>
            </div>
            </div>   
        </div>}
        </Container>
        </>
    )
}
export default Details