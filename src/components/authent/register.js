import { Container } from "react-bootstrap"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import "./login.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../validations-constant"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Login from "./login"
import PhoneInput from "react-phone-input-2"
import { createUser, resetAddUser } from "../../redux-tool/slice-register"
import { toast } from "react-toastify"
function Register(){
    const registerState=useSelector(state=>state.addUser)
    const navigate=useNavigate()
    const {
    control,
    register,
    handleSubmit,
    formState: { errors,isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode:"all"
  });
  let dispatch=useDispatch()
  const onSubmit = (data) => {
    const formData=new FormData()
    formData.append("name",data.name)
    formData.append("email",data.email)
    formData.append("phone",data.phone)
    formData.append("password",data.password)
    dispatch(createUser(formData))
  };
  useEffect(()=>{
    if(registerState.data?.status==="SUCCESS"){
        toast.success("you've signed up successfully")
        localStorage.setItem("token",registerState.data.body.user.token)
        dispatch(resetAddUser())
        navigate("/")
    }else if(registerState.data?.status==="FAIL" || registerState.data?.status==="ERROR"){
        dispatch(resetAddUser())
        console.log(registerState.data.message)
        toast.error(`failed due to ${registerState.data.message}`)
    }
  },[registerState.data])
    const [value,setValue]=useState(true)
    const [login,setLogin]=useState(true)
    return(
        <>
        {login&&<Container className=" mt-80">
            <form onSubmit={handleSubmit(onSubmit)} className=" form-login">
            <div className="mb-2">
                <label className="text-primary" for="text1">username</label>
                <input {...register("name")} className="d-block" id="text1" type="text" placeholder="user name"/>
            </div>
                {errors.name&&<small className="d-block mb-2 text-danger">{errors.name.message}</small>}
            <div className="mb-2 ">
                <label for="email1" fo className="text-primary">email</label>
                <input {...register("email")} id="email1" className="d-block" placeholder="email"/>
            </div>
                {errors.email&&<small className="d-block mb-2 text-danger">{errors.email.message}</small>}
            
            <Controller
                name="phone"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <>
                    <div className="mb-2 ">
                    <label className="text-primary " htmlFor="phone">phone</label>
                    <PhoneInput
                        {...field}
                        onChange={(value) => field.onChange(value)}
                        country={"eg"}
                        inputClass="inputPhoneInput"
                        containerClass=''
                        buttonClass=""
                        localization={{
                        'EG': 'مصر',
                        }}
                        inputProps={{
                        name: 'phone',
                        id:"phone",
                        required: true,
                        autoFocus: false
                        }}    
                        />
                    </div>
                    {errors.phone && <small className="d-block mb-2 text-danger">{errors.phone.message}</small>}
                    </>
                )}
                />
                

            <div className="mb-3">
                <label for="password1" className="text-primary">password</label>
                <div className="d-flex">
                <input {...register("password")} className="d-block " id="password1" type={value?"password":"text"} placeholder="your password"/>
                <FontAwesomeIcon onClick={()=>setValue(!value)} className="text-primary" style={{marginLeft:"-30px",marginTop:"15px"}} icon={value?faEye:faEyeSlash} />
                </div>
            </div>
                    {errors.password&&<small className="d-block mb-2 text-danger">{errors.password.message}</small>}
            <button disabled={!isValid} type="submit" className="btn btn-outline-success">
                {registerState.loading?<div className="d-flex align-items-center gap-2">Loading...<span className="Submit-loading"></span></div>:"submit"}
            </button>
            <div className="mt-3">Already have an account? <span style={{cursor:"pointer"}} className="text-primary" onClick={()=>setLogin(false)}>Login</span></div>
        </form>
        </Container>}
        {!login&&<Login />}
        </>
    )
}
export default Register