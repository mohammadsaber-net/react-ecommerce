import { useEffect} from "react"
import { useRef } from "react"
import { toast } from "react-toastify"
import "./cart.css"
import { useDispatch, useSelector } from "react-redux"
import {passing} from "./../../redux-tool/slice-guard"
import { useNavigate } from "react-router-dom"
function Confirmation(props){
    const totalPrice=useSelector(state=>state.totalPrice)
    const formRef=useRef(null)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const available=(type)=>{
        if(type==="Mobil-Wallet") toast.info("payment by mobile wallet not available now")
        else if(type==="cash") {
            dispatch(passing("cash"))
            navigate("/payment/cash") 
        }
        else {
            dispatch(passing("visa"))
            navigate("/payment/visa") 
        }
    }
    useEffect(()=>{
        const timer=setTimeout(()=>{
            if(formRef.current){
                formRef.current.classList.add("show")
            }
        },50)
        return ()=>clearTimeout(timer)
    },[])
    return(
        <>
        <div className="form-container">
            <div ref={formRef} className="form pb-5 scale-in bg-light">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <p className="fs-5 mb-2">total price of order : {totalPrice} EGP</p>
                    <div onClick={()=>props.setConfiramtion(false)} className="close-button">x</div>
                </div>
                <h3 className="mt-1"><span className="text-primary me-1">NOW</span>please choose your payment method :</h3>
                <div className="d-flex mt-4 gap-2">
                    <div onClick={()=> available("visa")} className="btn btn-outline-primary">Visa</div>
                    <div onClick={()=> available("cash")} className="btn btn-outline-primary">Cash</div>
                    <div onClick={()=> available("Mobil-Wallet")} className="btn btn-outline-primary">Mobil Wallet</div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Confirmation