import { Link } from "react-router-dom"
import "./managment.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faUser, faUserShield, faXmark } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
function SideBar(params){
    const [width,setWidth]=useState(false)
    
    return(
        <>
        <div className={`sideBar ${width?'showIt':''}`}>
            <FontAwesomeIcon className={`sideBarIcon ${width?'text-primary':'text-info'}`} onClick={()=>setWidth(!width)} icon={width?faXmark :faBars}/>
            <div>
            <div className="side">
            <Link to={"/managment"} onClick={()=>setWidth(false)} className='nav-link d-flex gap-2 justify-content-center align-items-center'>Managment <FontAwesomeIcon icon={faUserShield} /></Link>
            </div>
            <div className="side">
            <Link to={"/users"} onClick={()=>setWidth(false)} className='nav-link d-flex gap-2 justify-content-center align-items-center'>Users  <FontAwesomeIcon icon={faUser} /> {params.number>0&&<span className="badge bg-danger">{params.number}</span>}</Link>
            </div>
            </div>
        </div>
        </>
    )
}
export default SideBar