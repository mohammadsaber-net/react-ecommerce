import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
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
  const [scroll, setScroll] = useState(false);
  const navigate =useNavigate()
  const [cart,setCart]=useState(0)
  let dispatch=useDispatch()
  const [logOut,setLogOut]=useState(false)
    useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
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
      <Navbar id='mainNav' className={`fixed fixed-top  pe-3 ps-3 ${!scroll?"bg-info":"bg-info"}`}>
      
        <NavLink to={"/"} className={` navbar-brand text-black text-white`}>Awesome Store</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto ">
            <NavLink to={"/cart"} className={`${cart>0?`text-white nav-link`:"nav-link"} `}><FontAwesomeIcon icon={faCartShopping} /><span className='position-relative cart-number '>{cart}</span></NavLink>
            {!logOut?<NavLink to={"/login"} className={`nav-link text-white `}>login</NavLink>:<NavLink to={"/login"} onClick={(e)=>{e.preventDefault(); ;changeLoginState()}} className={`nav-link text-black ${scroll?"":"text-white"}`}>logOut</NavLink>}
          </Nav>
        </Navbar.Collapse>
    </Navbar>
    )
}
export default Navbarr