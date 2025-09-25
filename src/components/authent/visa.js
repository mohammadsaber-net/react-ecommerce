import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import MapAddressPicker from "./mapAddress"
import { initiatePayment, resetPaymentState } from "../../redux-tool/paymentSlice"
import { toast } from "react-toastify"
import { resetSendingOrder } from "../../redux-tool/confirmOrder"

function Visa(){
  const passing=useSelector(state=>state.pass)
  const cash=useSelector(state=>state.sendingOrder)
  const total =useSelector(state=>state.totalPrice)
  const { loading,error, paymentUrl } = useSelector((state) => state.payment);
  const navigate=useNavigate()
  useEffect(()=>{
    if(passing!=="visa") navigate("/")
  },[])
const dispatch=useDispatch()
const userInfo=useSelector((state) => state.checkAuth.data)
  useEffect(()=>{
      if(cash.data?.status==="FAIL"||cash.data?.status==="ERROR"){
        toast.error("failed to set your order")
      }else if(cash.data?.status==="SUCCESS"){
        dispatch(initiatePayment(total))
      }
      if(error){
        toast.error(error)
      }
    },[cash.data,error])
    useEffect(()=>{
      return ()=>{
        dispatch(resetSendingOrder());
        dispatch(resetPaymentState())
      }
    },[dispatch])
    useEffect(()=>{
      if(paymentUrl){
        toast.success("order confirmed !")
        toast.info("complete visa payments")
        localStorage.removeItem("order")
      }
    },[dispatch])
    return(
    <div className="container mt-80">
      <h3>total price : {total}</h3>
      <MapAddressPicker loading={loading} visa='visa'/>
      {paymentUrl&&
        <div>
          <small className="text-success">thanks ms/mr {userInfo.name}, <br /> a message will be sent to your email {userInfo.email} </small>
          <h5 className="mb-0">Now complete your payment:</h5>
          <iframe
            src={paymentUrl}
            title="Paymob Payment"
            height={950}
            style={{ border: "none",width:"100%",marginTop:"0"}}
          />
        </div>}
      </div>
    )
}
export default Visa