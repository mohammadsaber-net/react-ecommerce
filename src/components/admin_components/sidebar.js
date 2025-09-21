import { Link } from "react-router-dom"
import "./managment.css"
function SideBar(){
    return(
        <>
        <div className="sideBar">
            <div>
            <div className="side">
            <Link to={"/managment"} className='nav-link'>Managment</Link>
            </div>
            <div className="side">
            <Link to={"/users"} className='nav-link'>Users</Link>
            </div>
            </div>
        </div>
        </>
    )
}
export default SideBar