
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

function Navbarr(){
  let login=useSelector(state=>state.adminLogin.userInfo)
  let register=useSelector(state=>state.addUser.data)
  let number=useSelector(state=>state.cart)
  const [cart,setCart]=useState(0)
  let dispatch=useDispatch()
  const navigate=useNavigate()
  const [managment,setManagment]=useState(false)
  const [logOut,setLogOut]=useState(false)
  useEffect(()=>{
    
    setCart(number?.length||0)
    const admin = localStorage.getItem('token');
    if (admin) {
      try {
        const decodedToken = jwtDecode(admin);
        if (decodedToken.exp * 1000 < Date.now()) {
            localStorage.removeItem('token');
            setLogOut(false);
            setManagment(false);
            dispatch(setIsAdmin(false));
            return;
          }
        if (decodedToken.role === 'ADMIN') {
          navigate("/")
          setManagment(true);
        }else{
          setManagment(false);
        }
        navigate("/")
        setLogOut(true);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }else{
      setManagment(false);
    }
    dispatch(setIsAdmin(managment))
  }, [login,register,number]);
  const changeLoginState=()=>{
    setLogOut(false)
    setManagment(false)
    localStorage.removeItem("token")
  }
    return(
      <Navbar  className="fixed fixed-top bg-danger text-primary pe-3 ps-3">
      
        <Link to={"/"} className='navbar-brand text-white'>STORE</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto ">
            {managment && <Link to={"/managment"} className='nav-link text-white'>Managment</Link>}
            <Link to={"/cart"} className={cart>0?`text-white nav-link`:"nav-link"}><FontAwesomeIcon icon={faCartShopping} /><span className='position-relative cart-number '>{cart}</span></Link>
            {!logOut?<Link to={"/login"} className='nav-link text-white'>login</Link>:<Link to={"/login"} onClick={()=>changeLoginState()} className='nav-link text-white'>logOut</Link>}
          </Nav>
        </Navbar.Collapse>
      
    </Navbar>
    )
}
export default Navbarr