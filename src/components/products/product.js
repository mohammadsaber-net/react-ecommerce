import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../../redux-tool/slice-product';
import { Container } from 'react-bootstrap';
import { addToCart } from '../../redux-tool/slice-cart';
import "./product.css"
import { Link,} from 'react-router-dom';
import Spinner from '../spinner&slider/spinner';
import Hero from '../spinner&slider/hero';
import { motion } from 'framer-motion';
function Product(){
    const dispatch=useDispatch()
    const products=useSelector(state=>state.products)
    useEffect(()=>{
        dispatch(fetchProduct())
        if(localStorage.getItem("order")) dispatch(addToCart(JSON.parse(localStorage.getItem("order"))))
    },[])
    const addToStorage=(data)=>{
      if(localStorage.getItem("order")){
        const order=JSON.parse(localStorage.getItem("order"))
        const findProduct=order.find((product)=>product.product._id===data._id)
        if(findProduct){
          findProduct.quantity += 1
        }else{
          order.push({quantity:1,product:data})
        }
        localStorage.setItem("order",JSON.stringify(order))
        
     }else{
      localStorage.setItem("order",JSON.stringify([{quantity:1,product:data}]))
     }
     dispatch(addToCart(JSON.parse(localStorage.getItem("order"))))
    }
    const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, duration: 0.5 }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  }
};
    return (
        <>
          {products.length===0 && <Spinner />}  
          <Hero />
       { <Container className='sub-container my-5'>
          {products.length>0&&<div className=' category-parent bg-primary'>
            <Link to={`/products/men's clothing`} className='category'>men's clothing</Link>
            <Link to={`/products/jewelery`} className='category'>jewelery</Link>
            <Link to={`/products/electronics`} className='category'>electronics</Link>
            <Link to={`/products/women's clothing`} className='category'>women's clothing</Link>
          </div>}
            <motion.div
          id="shopping"
          key={products.length}
          className="row"
          variants={container}
          initial="hidden"
          animate="show"
        >
        {
          products.map(product=>(
              
              <motion.div variants={item} whileHover={{ scale: 1.03 }} className='cloumns col-12 col-sm-6 col-md-4 col-xl-3' key={product._id} style={{marginBottom:"20px"}}>
                
            <Card className='content'  key={product._id}>
             
            <img
            //  products-image
              className='img-fluid'
              style={{ height: "200px" }}
              src={`https://ecommerce-back-pys6.onrender.com/images/${product.image}`}
              alt={product.title}
              />
      <Card.Body>
        <Link  to={`/product/${product._id}`}>
        <Card.Title className="title mb-1">{product.title}</Card.Title>
        </Link>
        <p className='text-dark mt-0 mb-0 fs-5'>price: {product.price} EGP</p>
        <div className='options' style={{display:"flex",justifyContent:"space-between"}} >
        <Button  variant="outline-primary" onClick={()=>addToStorage(product)}>cart</Button>
        <Link className="btn btn-outline-info" to={`/product/${product._id}`} >details</Link>
        </div>
      </Card.Body>
    </Card>
            </motion.div>
            )
            
          )
        }
        </motion.div>
        </Container>
} 
        </>
    )
}
export default Product