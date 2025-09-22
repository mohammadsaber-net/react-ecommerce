
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import "./navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import {jwtDecode}from "jwt-decode";
import { setIsAdmin } from '../redux-tool/isAdmin';
import { resetLogin } from '../redux-tool/adminLogin';

function Navbarr(){
  let login=useSelector(state=>state.adminLogin)
  let register=useSelector(state=>state.addUser)
  let number=useSelector(state=>state.cart)
  const navigate =useNavigate()
  const [cart,setCart]=useState(0)
  let dispatch=useDispatch()
  const [logOut,setLogOut]=useState(false)
  useEffect(()=>{
    setCart(number?.length||0)
    if(login.userInfo?.status==="SUCCESS"||register.data?.status==="SUCCESS"){
      setLogOut(true)
    }
  },[number,login.userInfo,register.data])
  const changeLoginState=()=>{
    navigate("/login")
    setLogOut(false)
    localStorage.removeItem("token")
    dispatch(resetLogin())
  }
    return(
      <Navbar  className="fixed fixed-top bg-danger text-primary pe-3 ps-3">
      
        <Link to={"/"} className='navbar-brand text-white'>STORE</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto ">
            <Link to={"/cart"} className={cart>0?`text-white nav-link`:"nav-link"}><FontAwesomeIcon icon={faCartShopping} /><span className='position-relative cart-number '>{cart}</span></Link>
            {/* {managment && <Link to={"/managment"} className='nav-link text-white'>Managment</Link>}
            {managment && <Link to={"/users"} className='nav-link text-white'>Users</Link>} */}
            {!logOut?<Link to={"/login"} className='nav-link text-white'>login</Link>:<Link to={"/login"} onClick={(e)=>{e.preventDefault(); ;changeLoginState()}} className='nav-link text-white'>logOut</Link>}
          </Nav>
        </Navbar.Collapse>
      
    </Navbar>
    )
}
export default Navbarr