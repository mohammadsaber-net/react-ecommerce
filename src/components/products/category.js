import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { fetchingCategory } from "../../redux-tool/slice-category"
import Spinner from "../spinner&slider/spinner"
import { Button, Card, Container } from "react-bootstrap"
import { addToCart } from "../../redux-tool/slice-cart"
import Hero from "../spinner&slider/hero"

function Category(){
    let category=useParams().cate
    let products=[]
    products=useSelector(state=>state.cateProducts)
    let dispatch=useDispatch()
    useEffect(()=>{
       dispatch(fetchingCategory(category)) 
    },[])
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
    }, [products]);
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
    return(
        <>
        <Hero />
        {products.length===0&&<Spinner />}
        <Container >
            
            {products.length>0&&<Link className="mt-5 mb-3 w-100 btn btn-outline-success" to={"/"}>show all products</Link>}
          <div className='row'>
        {
          products.map(product=>{
            return(
              <div className='cloumns col-12 col-sm-6 col-md-4 fade-up col-xl-3'  style={{marginBottom:"20px"}} key={product._id}>
            <Card className='content'  key={product.id}>
      <img className='img-fluid' style={{height:"200px"}}  src={product.image} />
      {/* <Card.Body>
        <Link to={`/product/${product.id}`}>
        <Card.Title className="title">{product.title}</Card.Title>
        </Link>
        <div className='options' style={{display:"flex",justifyContent:"space-between"}} >
        <Button  variant="primary" onClick={()=>dispatch(addToCart(product))}>cart</Button>
        <Link className="btn btn-primary" to={`/product/${product._id}`} >details</Link>
        </div>
      </Card.Body> */}
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
            
          })
        }
        </div>
        </Container>
        </>
    )
}
export default Category