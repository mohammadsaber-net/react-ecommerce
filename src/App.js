
import { Route, Routes, useNavigate} from 'react-router-dom';
import './App.css'; 
import Navbar from './components/navbar';
import Cart from './components/cart/cart-car';
import Product from './components/products/product';
import Details from './components/products/Details';
import Login from './components/authent/login';
import Category from './components/products/category';
import Footer from './components/footer';
import Managment from './components/admin_components/managment';
import Cash from './components/authent/cash';
import Visa from "./components/authent/visa"
import Users from './components/admin_components/users';
import SideBar from './components/admin_components/sidebar';
import { useEffect, useState } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { fetchAuthentication } from './redux-tool/authentication';
import { toast, ToastContainer } from 'react-toastify';
import ScrollToTop from './components/scrollToTop';
import { fetchUserRecieved } from './redux-tool/slice.userRecieved';
import { getUsersOrders } from './redux-tool/slice-usersOrders';

function App() {
  const [managment,setManagment]=useState(false)
  const data = useSelector((state) => state.checkAuth);
  const dispatch=useDispatch()
  useEffect(() => {
    dispatch(fetchAuthentication())
  }, [dispatch]);
  const navigate =useNavigate()
  useEffect(() => {
    if (data.data?.auth && data.data?.role === 'ADMIN') {
      setManagment(true)
      toast.success(`welcome mr: ${data.data?.name || "mohammad"}`)
      dispatch(getUsersOrders())
      return
    }else{
      navigate("/")
    }
    return setManagment(false)
  }, [data?.data]);
  const [number,setNumber]=useState(0)
      const newOrders=useSelector(state=>state.getUsers.data?.orders)
      useEffect(() => {
      if (newOrders && newOrders.length) {
    const allItems = newOrders.flatMap(order => order.items);
    const notReceived = allItems.filter(item => item.received === false);
    setNumber(notReceived.length);
  }
    }, [newOrders]);
  return (
    <div className='App'>
      <ScrollToTop />
      <Navbar /> 
      {managment&&<SideBar number={number}/>} 
      <Routes>
        <Route path='/' element={<Product />} />
        <Route path='/payment/visa' element={<Visa />} />
        <Route path='/payment/cash' element={<Cash />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        {managment&&<Route path='/users' element={<Users />}/>}
        {managment&&<Route path='/managment' element={<Managment />}/>}
        <Route path='/product/:Id' element={<Details />} />
        <Route path='/products/:cate' element={<Category />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </div> 
  );
}
export default App;
