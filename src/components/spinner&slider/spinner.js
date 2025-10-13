import { useEffect, useState } from "react";
import "./spinner.css";
import { useSelector } from "react-redux";
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
              يرجي الانتظار لمدة 50 ثانية تقريبا لكي يفتح الموقع <br/>  وذلك نظرا لاستخدام استضافة مجانية وهذا يكون مرة واحدة فقط
            </div>}
            <span class="loader"></span>
        </div>
    )
}
export default Spinner