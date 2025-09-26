import { useEffect, useState } from 'react';
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
    // const [darkMode, setDarkMode] = useState(false);
    const products=useSelector(state=>state.products)
    const [search,setSearch]=useState("")
    useEffect(() => {
      const faders = document.querySelectorAll('.fade-up');
      const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      faders.forEach(fade => {
        appearOnScroll.observe(fade);
      });

      return () => appearOnScroll.disconnect();
    }, [products, search]);

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
    
    return (
    // <div className={darkMode ? "dark-mode" : ""}>
        <>
          {products.length===0 && <Spinner />}  
          <Hero />
          
       { <Container className='sub-container my-5'>
          {products.length>0&&
          <div className=' category-parent bg-primary'>
            <Link to={`/products/men's clothing`} className='category'>men's clothing</Link>
            <Link to={`/products/jewelery`} className='category'>jewelery</Link>
            <Link to={`/products/electronics`} className='category'>electronics</Link>
            <Link to={`/products/women's clothing`} className='category'>women's clothing</Link>
          </div>}
          <div className='mt-2 mb-3 position-relative'>
            <input type='text' className='form-control bg-light text-primary w-75' placeholder='search by product name' value={search} onChange={(letters)=>setSearch(letters.target.value)} />
          </div>
          <div
            id="shopping" className="row">
            {products.filter(product =>
             product.title.toLowerCase().includes(search.toLowerCase())
              ).map(product => (
              
              <div
                key={product._id}
                className="cloumns fade-up col-12 col-sm-6 col-md-4 col-xl-3"
                style={{ marginBottom: "20px" }}
              >  
            <Card className='content'  key={product._id}>
            <img
            //  products-image
              className='img-fluid'
              style={{ height: "200px" }}
              src={product.image}
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
            </div>
            )
            
          )
        }
        </div>
        </Container>
} 
        </>
        // </div>
    )
}
export default Product