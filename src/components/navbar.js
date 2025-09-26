import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import "./navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { resetLogin } from '../redux-tool/adminLogin';
import { fetchAuthentication } from '../redux-tool/authentication';
import { toast } from 'react-toastify';
function Navbarr(){
  const data = useSelector((state) => state.checkAuth);
  let number=useSelector(state=>state.cart)
  const navigate =useNavigate()
  const [cart,setCart]=useState(0)
  let dispatch=useDispatch()
  const [logOut,setLogOut]=useState(false)
  useEffect(()=>{
    setCart(number?.length||0)
  },[number])
  const changeLoginState = async () => {
  const respone=await fetch(`/user/logout`,{
        method: "POST",
        credentials: "include"
    })
    if(respone.ok){
      const data=await respone.json()
      if(data.status==="SUCCESS"){
        dispatch(resetLogin());
        dispatch(fetchAuthentication());
        navigate("/login");
        setLogOut(false)
      }else{
      toast.error("failed to logOut")
    }
    }else{
      toast.error("failed to logOut")
    }
  
};
useEffect(() => {
    if (data.data?.auth) {
      return setLogOut(true)
    }
  }, [data?.data]);
    return(
      <Navbar  className="fixed fixed-top bg-danger text-primary pe-3 ps-3">
      
        <Link to={"/"} className='navbar-brand text-white'>STORE</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto ">
            <Link to={"/cart"} className={cart>0?`text-white nav-link`:"nav-link"}><FontAwesomeIcon icon={faCartShopping} /><span className='position-relative cart-number '>{cart}</span></Link>
            {!logOut?<Link to={"/login"} className='nav-link text-white'>login</Link>:<Link to={"/login"} onClick={(e)=>{e.preventDefault(); ;changeLoginState()}} className='nav-link text-white'>logOut</Link>}
          </Nav>
        </Navbar.Collapse>
      {/* <div className="text-end p-3">
              <Button variant={darkMode ? "light" : "dark"} onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? "الوضع النهاري" : "الوضع الليلي"}
            </Button>
        </div> */}
    </Navbar>
    )
}
export default Navbarr