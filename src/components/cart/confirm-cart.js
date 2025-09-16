import { useDispatch } from "react-redux"
// import { loginState } from '../../redux-tool/slice-login';
import { Link, useNavigate } from "react-router-dom"
import { setConfirm } from "../../redux-tool/showLoginCart"
import { useState } from "react"

function Confirm(props){
    let navigate=useNavigate()
    const [getEmail,setGetEmail]=useState('')
    const [remember,setRemember]=useState(false)
    const [notHaveEmail,setNotHaveEmail]=useState(false)
    let dispatch=useDispatch()
    const toCart=()=>{
        dispatch(setConfirm(false))
    }
    const activeEmail=()=>{
        if(localStorage.getItem("userInfo")){
            let email=JSON.parse(localStorage.getItem("userInfo")).email
            if(email===getEmail){
                
                navigate("/card")
            }else{
                setRemember(true)
            }
        }else{
            setNotHaveEmail(true)
        }
    }
    const handleSubmit=(event)=>{
        event.preventDefault()
    }
    return(
        <>
        <div className=" confirm-login">
           <div className="container content bg-white p-3">
            <div className="d-flex justify-content-between align-items-center">
                <button onClick={()=>toCart()} className="btn btn-outline-danger">x</button>
             <h3 className="text-primary">sign in to continue</h3>
            </div>
            <form onSubmit={handleSubmit} className="text-center mt-3" >
                <label className="">add your email</label>
                <input onChange={(event)=>setGetEmail(event.target.value)} className="form-control mt-1 m-auto w-75 mb-2"/>
                {remember&&<small className="text-danger">this is not the email, you can <Link to={"/login"} className="text-primary">sign up</Link></small>}
                {notHaveEmail&&<small className="text-danger">you don't have email, you can <Link to={"/login"} className="text-primary">sign up</Link></small>}
                <button  onClick={()=>activeEmail()} className="btn w-50 m-auto text-center btn-primary">continue</button>
            </form>
                <small>by continue you're accept our <span className="text-primary">terms and policy</span> </small>
                <div className="redirect">are you new client ? <Link to={"/login"} className="text-primary">sign up</Link></div>
           </div>
        </div>
        </>
    )
}
export default Confirm