import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { visaSchema } from "../validations-constant"
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeCart } from "../../redux-tool/slice-cart";


function Visa(){
  let navigate=useNavigate()
  let dispatch=useDispatch()
  const passing=useSelector(state=>state.pass)
  useEffect(()=>{
    if(passing!=="visa") navigate("/")
  })
  const[seeCvv,setSeeCvv]=useState(false)
  const[seeNum,setSeeNum]=useState(false)
  const [value,setValue]=useState('')
  const controlExpInput=(event)=>{
    setValue(event)
    if(value.length===2){
      setValue(value+"/")
    }
  }
  const{
    register,
    handleSubmit,
    formState:{errors,isValid}
    }=useForm({
      resolver:yupResolver(visaSchema),
       mode:"all"
    })
    let timerInterval;
  const visaConfirmed=()=>{
  Swal.fire({
  title: "confirming!",
  html: "wait a <b></b> till comfirmation your order.",
  timer: 2000,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading();
    const timer = Swal.getPopup().querySelector("b");
    timerInterval = setInterval(() => {
      timer.textContent = `${Swal.getTimerLeft()}`;
    }, 100);
  },
  willClose: () => {
    clearInterval(timerInterval);
    navigate("/")
    dispatch(removeCart())
  }
}).then((result) => {
  if (result.dismiss === Swal.DismissReason.timer) {
    console.log("I was closed by the timer");
  }
});
    }
    return(
    <div class="visa-form" id="visaForm">
    <h3 className="text-info">card info </h3>
    <form onSubmit={handleSubmit(visaConfirmed)}>
      <input {...register("number")} type={!seeNum?"password":"text"} placeholder="visa number" required maxlength="16" />
      <FontAwesomeIcon onClick={()=>setSeeNum(!seeNum)} className="text-primary" style={{marginLeft:"-30px"}} icon={seeNum?faEye:faEyeSlash} />
       {errors.number&&<small className="d-block text-danger">{errors.number.message}</small>}
      <input {...register("name")} type="text" placeholder="name as on visa" required />
       {errors.name&&<small className="d-block text-danger">{errors.name.message}</small>}
      <input {...register("exp")} value={value} onChange={(event)=>controlExpInput(event.target.value)} type="text" placeholder=" expiry-date (MM/YY)" required />
       {errors.exp&&<small className="d-block text-danger">{errors.exp.message}</small>}
      <input {...register("cvv")} type={!seeCvv?"password":"text"} placeholder="CVV code" />
      <FontAwesomeIcon onClick={()=>setSeeCvv(!seeCvv)} className="text-primary" style={{marginLeft:"-30px"}} icon={seeCvv?faEye:faEyeSlash} />
       {errors.cvv&&<small className="d-block text-danger">{errors.cvv.message}</small>}
      <button disabled={!isValid} type="submit">buy now</button>
    </form>
  </div>
    )
}
export default Visa