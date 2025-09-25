import { useDispatch, useSelector } from 'react-redux';
import MapAddressPicker from './mapAddress';
import { useEffect,useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { resetSendingOrder } from '../../redux-tool/confirmOrder';
function Cash({}) {
  const total =useSelector(state=>state.totalPrice)
  const cash=useSelector(state=>state.sendingOrder)
  const passing=useSelector(state=>state.pass)
  const [confirmed,setConfrimed]=useState(false)
  const navigate =useNavigate()
  useEffect(()=>{
    if(passing!=="cash") navigate("/")
    },[])
  const userInfo=useSelector((state) => state.checkAuth.data)
  useEffect(()=>{
    if(cash.data?.status==="FAIL"||cash.data?.status==="ERROR"){
      toast.error("failed to set your order")
    }else if(cash.data?.status==="SUCCESS"){
      setConfrimed(true)
    }
  },[cash.data])
  const dispatch=useDispatch()
  const resertPopub=()=>{
    dispatch(resetSendingOrder())
    setConfrimed(false)
    navigate("/")
    toast.success("order confirmed !")
    localStorage.removeItem("order")
  }
    
  return (
    <div className="container mt-80">
      <h3>confirm order</h3>
      <h3>total price : {total}</h3>
      <MapAddressPicker />
      <div>
        {confirmed&&<div className="form-container">
          <div className='form'>
            <div className='text-center' style={{height:"200px"}}>
              <h4 className='text-start'>hello mr/ms {userInfo.name} :</h4>
              <div style={{maxWidth:"350px"}}>order confirmed and a message will be sent to this email <span className='text-primary'>{userInfo.email}</span></div>
              <strong className="text-success mb-3 mt-3 d-block">thanks for using our store</strong>
              <button onClick={()=> resertPopub() } className='btn btn-primary'>Ok</button>
            </div>
          </div>
        </div>}
      </div>
    </div>
  );
}
export default Cash