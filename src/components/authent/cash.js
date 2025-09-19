
import { useSelector } from 'react-redux';
import MapAddressPicker from './mapAddress';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';


function Cash({}) {
  const total =useSelector(state=>state.totalPrice)
  const cash=useSelector(state=>state.sendingOrder)
  useEffect(()=>{
    if(cash.data.status==="SUCCESS"){
      Swal.fire(cash.data.message)
    }else if(cash.data.status==="FAIL"||cash.data.status==="ERROR"){
      toast.error("failed to set your order")
    }
  },[cash.data])
  return (
    <div className="container mt-80">
      <h3>confirm order</h3>
      <p>total price: {total} EGP</p>
      <MapAddressPicker  />
    </div>
  );
}
export default Cash