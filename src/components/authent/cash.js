
import { useSelector } from 'react-redux';
import MapAddressPicker from './mapAddress';
import { useEffect,useRef,useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



function Cash({}) {
  const total =useSelector(state=>state.totalPrice)
  const cash=useSelector(state=>state.sendingOrder)
  const passing=useSelector(state=>state.pass)
  const [confirmed,setConfrimed]=useState(false)
  const navigate =useNavigate()
  useEffect(()=>{
    if(passing!=="cash") navigate("/")
    },[])
  const userInfo=JSON.parse(localStorage.getItem("userInfo"))
  useEffect(()=>{
    if(cash.data?.status==="FAIL"||cash.data?.status==="ERROR"){
      toast.error("failed to set your order")
    }else if(cash.data?.status==="SUCCESS"){
      setConfrimed(true)
    }
  },[cash.data])
  return (
    <div className="container mt-80">
      <h3>confirm order</h3>
      <p>total price: {total} EGP</p>
      <MapAddressPicker  />
      <div>
        {confirmed&&<div className="form-container">
          <div className='form'>
            <div className='text-center' style={{height:"200px"}}>
              <h4 className='text-start'>hello mr/ms {userInfo.name} :</h4>
              <div style={{maxWidth:"350px"}}>order confirmed and a message will be sent to this email <span className='text-primary'>{userInfo.email}</span></div>
              <strong className="text-success mb-3 mt-3 d-block">thanks for using our store</strong>
              <button onClick={()=> setConfrimed(false) } className='btn btn-primary'>Ok</button>
            </div>
          </div>
        </div>}
      </div>
    </div>
  );
}
export default Cash