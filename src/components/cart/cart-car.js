import { Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {  changeAmount, deleteFromCart, increaseAndDcrease, removeCart } from "../../redux-tool/slice-cart"
import { Link} from "react-router-dom"
import image from "./../image/shop-now-message-neon-light-260nw-1826396891.webp"
import "./cart.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons/faCartArrowDown"
import Confirm from "./confirm-cart"
import { setConfirm } from "../../redux-tool/showLoginCart"


function Cart(){
    let cart=useSelector(state=>state.cart)
    let showConfirm=useSelector(state=>state.showLogin)
    let dispatch=useDispatch()
    let total=0
    cart.map(product=>total += product.price * product.quantity)
    
        return(
            <div className="container mt-57">
                {showConfirm&&<Confirm />}
                <h3>your cart have <span className="text-primary">{cart.length}</span> items</h3>
                {cart.length===0&&<div className="text-center">
                    <p className="text-primary fs-4">click image to start shopping <FontAwesomeIcon icon={faCartArrowDown}/></p>
                    <Link to={"/"}><img className="image-cart" src={image} alt="buy now image" /></Link>
                </div>}
               {cart.length>0&&<div>
                <div onClick={()=>dispatch(removeCart())} className="btn btn-danger">clear</div>
                <Table className="cart-table" striped bordered hover size="sn">
                    <thead>
                        <tr>
                            <th>image</th>
                            <th>title</th>
                            <th>price</th>
                            <th className="total-one-price">total price</th>
                            {/* <th>amount</th> */}
                            <th>change</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map(product=>{
                            return(
                                <tr key={product.id}>
                                    <th style={{width:"100px",height:"100px"}}><img className="w-100 h-100" src={product.image} alt={product.name}/></th>
                                    <td>{product.title.slice(0,100)}...</td>
                                    <td>{product.price} $</td>
                                    <td className="total-one-price">{(product.price * product.quantity).toFixed(1)} $</td>
                                    {/* <td>{product.quantity}</td> */}
                                    <td><div className="d-flex gap-2 align-items-center">
                                        <span onClick={()=>dispatch(increaseAndDcrease({product,state:"+"}))} className="plus bg-success">+</span>
                                        <input value={product.quantity} style={{maxWidth:"50px"}} onChange={(eve)=>dispatch(changeAmount({product,quantity:eve.target.value}))} />
                                        {<span style={{visibility:product.quantity>=2?"visible":"hidden"}} onClick={()=>dispatch(increaseAndDcrease({product,state:"-"}))} className="minus bg-danger">-</span>}
                                        </div>
                                    </td>
                                    <td onClick={()=>dispatch(deleteFromCart(product))} className="btn btn-danger">delete</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <div className="d-flex justify-content-between">
                <h5>total is: {total.toFixed(1)}</h5>
                <button onClick={()=>dispatch(setConfirm(true))} className="btn btn-outline-success">Order Now !</button>
                </div>
                </div>}
            </div>
            )
}
export default Cart