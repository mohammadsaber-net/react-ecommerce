import { Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {  addToCart, changeAmount, deleteFromCart, increaseAndDcrease, removeCart } from "../../redux-tool/slice-cart"
import { Link, useNavigate} from "react-router-dom"
import image from "./../image/shop-now-message-neon-light-260nw-1826396891.webp"
import "./cart.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons/faCartArrowDown"
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import { toast } from "react-toastify"
import { passing } from "../../redux-tool/slice-guard"
function Cart(){
    const cart=useSelector(state=>state.cart)
    const dispatch=useDispatch()
    const [total,setTotal]=useState(0)
    useEffect(()=>{
        const orderFromLocal = JSON.parse(localStorage.getItem("order"));
        if (orderFromLocal && Array.isArray(orderFromLocal) && orderFromLocal.length > 0) {
        dispatch(addToCart(orderFromLocal));
    }
},[])
    useEffect(() => {
    const totalPrice = cart.reduce((acc, product) => {
        return acc + product.product.price * product.quantity
    }, 0)
    setTotal(totalPrice.toFixed(2))
}, [cart])
const navigate=useNavigate()       
const redirctToBay=()=>{
    const token = localStorage.getItem('token');
     if (token) {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
            toast.error("please login again")
            navigate("/login")
            return;
        }
        toast.info("choose your payment method")
        dispatch(passing(true))
        navigate("/card")
        
        }else{
            toast.info("to continue please log in first")
            navigate("/login")
        }
    }
        return(
            <div className="container mt-57">
                <h3>your cart have <span className="text-primary">{cart.length}</span> items</h3>
                {cart.length===0&&<div className="text-center">
                    
                    <p className="text-primary fs-4">click image to start shopping <FontAwesomeIcon icon={faCartArrowDown}/></p>
                    <Link to={"/"}><img className="image-cart" src={image} alt="buy now image" /></Link>
                </div>}
               {cart.length>0&&<div>
                <div onClick={()=>dispatch(removeCart())} className="btn btn-danger">clear</div>
                <Table className="cart-table" bordered striped hover size="sn">
                    <thead>
                        <tr>
                            <th>image</th>
                            <th>title</th>
                            <th>price</th>
                            <th className="total-one-price">total price</th>
                            <th>change</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map(product=>{
                            return(
                                <tr key={product.product._id}>
                                    
                                    <th style={{width:"100px",height:"100px"}}><img className="w-100 h-100" src={`https://ecommerce-back-pys6.onrender.com/images/${product.product.image}`} alt={product.name}/></th>
                                    <td>{product.product.title}</td>
                                    <td>{product.product.price} $</td>
                                    <td className="total-one-price">{(product.product.price * product.quantity).toFixed(1)} $</td>
                                    <td><div className="d-flex gap-2 align-items-center">
                                        <span onClick={()=>dispatch(increaseAndDcrease({product,value:"+"}))} className="plus bg-success">+</span>
                                        <input value={product.quantity} style={{maxWidth:"50px"}} onChange={(eve)=>dispatch(changeAmount({product:product.product,quantity:eve.target.value}))} />
                                        {<span style={{visibility:product.quantity>=2?"visible":"hidden"}} onClick={()=>dispatch(increaseAndDcrease({product,value:"-"}))} className="minus bg-danger">-</span>}
                                        </div>
                                    </td>
                                    <td ><button onClick={()=>dispatch(deleteFromCart(product))} className="btn btn-danger">delete</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <div className="d-flex justify-content-between">
                <h5>total is: {total}</h5>
                <button onClick={()=>redirctToBay()} className="btn btn-outline-success">Order Now !</button>
                </div>
                </div>}
            </div>
            )
}
export default Cart