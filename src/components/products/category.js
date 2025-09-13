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
    
    return(
        <>
        <Hero />
        {products.length===0&&<Spinner />}
        <Container>
            
            {products.length>0&&<Link className="mt-5 mb-3 w-100 btn btn-outline-success" to={"/"}>show all products</Link>}
          <div className='row'>
        {
          products.map(product=>{
            return(
              <div className='cloumns col-12 col-sm-6 col-md-4 col-xl-3'  style={{marginBottom:"20px"}} key={product._id}>
            <Card className='content'  key={product.id}>
      <img className='img-fluid' style={{height:"200px"}}  src={`https://ecommerce-back-pys6.onrender.com/images/${product.image}`} />
      <Card.Body>
        <Link to={`/product/${product.id}`}>
        <Card.Title className="title">{product.title}</Card.Title>
        </Link>
        <div className='options' style={{display:"flex",justifyContent:"space-between"}} >
        <Button  variant="primary" onClick={()=>dispatch(addToCart(product))}>cart</Button>
        <Link className="btn btn-primary" to={`/product/${product.id}`} >details</Link>
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