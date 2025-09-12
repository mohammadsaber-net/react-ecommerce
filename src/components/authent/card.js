import { useEffect, useState } from "react"
import "./card.css"
import Vodafone from "./vodafone"
import Cash from "./cash"
import { motion, AnimatePresence } from "framer-motion";
import Visa from "./visa"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Card(){
    let navigate=useNavigate()
    const passingState=useSelector(state=>state.pass)
    useEffect(()=>{
    if(passingState===false){
        navigate('/')
    }
    },[navigate,passingState])
    const [method,setMethod]=useState('visa')
    return(
        <>
        <div className="sub-container">
        <div className="choose-method container">
            <label onClick={()=>setMethod("visa")} className="mb-3" for="visa1">
                <input id="visa1" type="radio" value="visa" name="radio-pay"/>
                use visa to pay
            </label>
        
            <label onClick={()=>setMethod("cash")} className="mb-3" for="cash1">
                <input id="cash1" type="radio" value="cash" name="radio-pay"/>
                pay on cach
            </label>       
       
            <label onClick={()=>setMethod("vodafone")} className="mb-3" for="vodafone1">
                <input id="vodafone1" type="radio" value="vodafone" name="radio-pay"/>
                pay by vodafone cash
            </label>
        
       
        <AnimatePresence>
            {method==="visa"&&
            <motion.div
            key="visaForm"
            initial={{height:0}}
            animate={{height:360}}
            exit={{height:0}}
            transition={{duration:0.3}}
            >
            <Visa />
            </motion.div>
                            }
        </AnimatePresence>
         <AnimatePresence>
            {method==="cash"&&
            <motion.div
            key="cashForm"
            initial={{height:0}}
            animate={{height:150}}
            exit={{height:0}}
            transition={{duration:0.3}}
            >
            <Cash />
            </motion.div>
            }
        </AnimatePresence>
        <AnimatePresence>
            {method==="vodafone"&&
        <motion.div
        key="vodafoneForm"
        initial={{height:0}}
        animate={{height:250}}
        exit={{height:0}}
        transition={{duration:0.3}}
        >
        <Vodafone />
        </motion.div>
}    
        </AnimatePresence> 
         </div>
        </div>
        </>
    )
}
export default Card