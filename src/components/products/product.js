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
function Product(){
    const dispatch=useDispatch()
    const products=useSelector(state=>state.products)
    useEffect(()=>{
        dispatch(fetchProduct())
    },[])
    
    return (
        <>
          {products.length===0 && <Spinner />}
          <Hero />
        <Container className='sub-container my-5'>
          {products.length>0&&<div className=' category-parent bg-primary'>
            <Link to={`/products/men's clothing`} className='category'>men's clothing</Link>
            <Link to={`/products/jewelery`} className='category'>jewelery</Link>
            <Link to={`/products/electronics`} className='category'>electronics</Link>
            <Link to={`/products/women's clothing`} className='category'>women's clothing</Link>
          </div>}
          
          <div id='shopping' className='row'>
        {
          products.map(product=>{
            return(
              
              <div className='cloumns col-12 col-sm-6 col-md-4 col-xl-3' key={product._id} style={{marginBottom:"20px"}}>
                
            <Card className='content'  key={product._id}>
             
            <img
              className='img-fluid products-image'
              style={{ height: "200px" }}
              src={`https://ecommerce-back-pys6.onrender.com/images/${product.image}`}
              alt={product.title}
              />
              {console.log(product.image)}
      <Card.Body>
        <Link  to={`/product/${product._id}`}>
        <Card.Title className="title mb-1">{product.title}</Card.Title>
        </Link>
        <p className='text-dark mt-0 mb-0 fs-5'>price: {product.price} EGP</p>
        <div className='options' style={{display:"flex",justifyContent:"space-between"}} >
        <Button  variant="outline-primary" onClick={()=>dispatch(addToCart(product))}>cart</Button>
        <Link className="btn btn-outline-info" to={`/product/${product._id}`} >details</Link>
        </div>
      </Card.Body>
    </Card>
            </div>
            )
            
          })
        }
        </div>
        </Container>
        
        </>
    )
}
export default Product