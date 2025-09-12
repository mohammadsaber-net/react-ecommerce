
import { Route, Routes } from 'react-router-dom';
import './App.css'; 
import Navbar from './components/navbar';
import Cart from './components/cart/cart-car';
import Product from './components/products/product';
import Details from './components/products/Details';
import Login from './components/authent/login';
import Card from "./components/authent/card"
import Category from './components/products/category';
import Confirm from './components/cart/confirm-cart';
import Footer from './components/footer';
import Managment from './components/admin_components/managment';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <div className='App'>
      <Navbar />   
      <Routes>
        <Route path='/' element={<Product />} />
        <Route path='/card' element={<Card />} />
        <Route path='/confirm' element={<Confirm />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
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
