import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { removeCart } from '../../redux-tool/slice-cart';
function Cash(){
    let navigate=useNavigate()
        let dispatch=useDispatch()
    const confirmed=()=>{
        Swal.fire({
        title: "confirmed!, a massege will arive you within a seconds",
        icon: "success",
        
    });
       navigate("/")
       dispatch(removeCart())
    }
    return(
        <>
        <div className="cash-form">
            <h3 className="text-info">bayment when recive order</h3>
           <from>
            <button onClick={()=>confirmed()} type="submit">confirm order</button>
           </from>
        </div>
        </>
    )
}
export default Cash