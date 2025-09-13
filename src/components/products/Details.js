import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { fetchOneProduct } from "../../redux-tool/slice-one-product";
import { Container } from "react-bootstrap";
import "./details.css"
import Spinner from "../spinner&slider/spinner";

function Details(){
    let dispatch=useDispatch()
    let products;
    products=useSelector(state=>state.oneProduct)
    let id=useParams().Id
    console.log(id)
    useEffect(()=>{
        if(id){
            dispatch(fetchOneProduct(id))
        }
    },[])

    return(
        <>
        {products.length===0 && <Spinner />}
        <Container className="product-details mt-80">
            {products&&<div className="d-flex justify-content-center flex-column align-items-center flex-sm-row align-items-sm-start">
            <Link to={"/"} className="btn btn-outline-primary">back to products page</Link>
            <div  className="details-box">
                <img src={`https://ecommerce-back-pys6.onrender.com/images/${products.image}`} alt={products.title} />
            <div className="info">
                <h3 className="text-primary">{products.title}</h3>
                <p className="text-dark">{products.description}</p>
                   
                <div className="price-rate">
                    <span>price: {products.price} $</span>
                </div>
            </div>
            </div>   
        </div>}
        </Container>
        </>
    )
}
export default Details