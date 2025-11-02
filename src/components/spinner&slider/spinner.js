import { useEffect, useState } from "react";
import "./spinner.css";
import { useSelector } from "react-redux";
import { faSmile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Spinner() {
    const products=useSelector(state=>state.products)
    const [hint,setHint]=useState(true)
    useEffect(()=>{
        if(products.length>0){
            setHint(false)
        }
    },[products])
    return (
        <div className="parent">
            {hint&&<div className="hint text-white">
              يرجي الانتظار قليلا حتي يفتح الموقع <br/>  وذلك نظرا لاستخدام استضافة مجانية وهذا يكون اول مرة<br /><FontAwesomeIcon className="mx-2" icon={faSmile} />
            شكرا لك</div>} 
            <span class="loader"></span>
        </div>
    )
}
export default Spinner