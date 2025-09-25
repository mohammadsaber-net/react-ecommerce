import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginSchema } from "../validations-constant";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Register from "./register";
import { adminLogin } from "../../redux-tool/adminLogin";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { fetchAuthentication, resetAuthentication } from "../../redux-tool/authentication";
function Login(){
  const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors,isValid },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode:"all"
  });
  let dispatch=useDispatch()
  const onSubmit = (data) => {
    const userInfo={email:data.email,password:data.password}
    dispatch(adminLogin(userInfo) );
  };
  const admin=useSelector(state=>state.adminLogin)
  useEffect(()=>{
    if(admin.userInfo){
      if(admin.userInfo.status==="FAIL"||admin.userInfo.status==="ERROR"){
      toast.error(admin.userInfo.message)
    }else if(admin.userInfo.status==="SUCCESS"){
      dispatch(fetchAuthentication())
      navigate("/")
      toast.success("login successful")
    }
  }
  },[admin.userInfo])
  const [value,setValue]=useState(true)
  const [login,setLogin]=useState(true)
    return(
        <>
        
        {login&&<Container>
            <form onSubmit={handleSubmit(onSubmit)} className=" form-login">
            <div className="mb-4">
                <label for="email1" fo className="text-primary">email</label>
                <input {...register("email")} id="email1" placeholder="email"/>
                {errors.email&&<small className="d-block text-danger">{errors.email.message}</small>}
            </div>
            <div className="mb-4">
                <label for="password1" className="text-primary">password</label>
                <input {...register("password")} id="password1" type={value?"password":"text"} placeholder="your password"/>
                <FontAwesomeIcon onClick={()=>setValue(!value)} className="text-primary" style={{marginLeft:"-30px"}} icon={value?faEye:faEyeSlash} />
                    {errors.password&&<small className="d-block text-danger">{errors.password.message}</small>}
            </div>
            <button disabled={!isValid}  type="submit" className="btn btn-success">{admin.loading?<div className="d-flex align-items-center gap-2">Loading...<span className="Submit-loading"></span></div>:"Submit"}</button>
            <div className="mt-3">Don't have an account? <span style={{cursor:"pointer"}} className="text-primary" onClick={()=>setLogin(false)}>Register</span></div>
        </form>
        </Container>}
        {!login&&<Register />}
        
        </>
    )
}
export default Login