
import { Route, Routes } from 'react-router-dom';
import './App.css'; 
import Navbar from './components/navbar';
import Cart from './components/cart/cart-car';
import Product from './components/products/product';
import Details from './components/products/Details';
import Login from './components/authent/login';
import Category from './components/products/category';
import Footer from './components/footer';
import Managment from './components/admin_components/managment';
import { ToastContainer } from 'react-toastify';
import Cash from './components/authent/cash';
import Visa from "./components/authent/visa"
import Users from './components/admin_components/users';
import SideBar from './components/admin_components/sidebar';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
function App() {
  const [managment,setManagment]=useState(false)
  const admin = localStorage.getItem('token');
  const login=useSelector(state=>state.adminLogin.userInfo)
  useEffect(()=>{
if (admin) {
          try {
            const decodedToken = jwtDecode(admin);
            if (decodedToken.exp * 1000 < Date.now()) {
              localStorage.removeItem("token");
              setManagment(false);
              return;
            }
            if (decodedToken.role === 'ADMIN') {
              setManagment(true);
            }else{
              setManagment(false);
            }
          } catch (error) {
            setManagment(false);
          }
        }else{
          setManagment(false);
        }
      }, [login]);
        
  return (
    <div className='App'>
      <Navbar /> 
      {/* {managment&&<SideBar />}  */}
      <Routes>
        <Route path='/' element={<Product />} />
        <Route path='/payment/visa' element={<Visa />} />
        <Route path='/payment/cash' element={<Cash />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/users' element={<Users />}/>
        <Route path='/managment' element={<Managment />}/>
        <Route path='/product/:Id' element={<Details />} />
        <Route path='/products/:cate' element={<Category />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </div> 
  );
}
export default App;
