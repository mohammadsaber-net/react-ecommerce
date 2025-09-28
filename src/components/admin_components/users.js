
import { useEffect, useState} from "react";
import { Container} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUsersOrders, resetgetUsersOrders } from "../../redux-tool/slice-usersOrders";
import Spinner from "../spinner&slider/spinner";

import Client from "./client";

function Users(){
    const {loading,data}=useSelector(state=>state.getUsers)
    const [orders,setOrder]=useState(false)
    const [recentOrders, setRecentOrders] = useState([])
    const users=data?.orders||[]
        const dispatch=useDispatch()
        const received=useSelector(state=>state.orderRecieved)
        useEffect(()=>{
            dispatch(getUsersOrders())
            return ()=>{
                dispatch(resetgetUsersOrders())
            }
        },[received.data])
        const showOrders=(data)=>{
           setRecentOrders(data)
            setOrder(true)
        }
        
    return(
        <>
        {loading&&<Spinner />}
        <Container className="mt-80">
            {orders&&<Client userId={recentOrders._id} setOrder={setOrder}/>}
            <h2 className="text-primary">
                Users
            </h2>
            <div className="holder">
              <table className="table manage-table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>E-mail</th>
                        <th>Phone</th>
                        <th>Orders</th>
                        <th>Address</th>
                        <th>Payment Method</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    users.map((user)=>{
                        return(
                            <tr key={user._id}>
                                <td>
                                <div className="email-box">
                                    <span className="short">{user?.name?.slice(0, 5) ?? ''}...</span>
                                    <span className="full">{user?.name ?? ''}</span>
                                </div>
                                </td>
                                <td className="text-primary">
                                <div className="email-box">
                                    <span className="short">{user?.email?.slice(0, 5) ?? ''}...</span>
                                    <span className="full">{user?.email ?? ''}</span>
                                </div>
                                </td>
                                <td>{user.phone}</td>
                                <td><div style={{cursor:"pointer"}} onClick={()=>showOrders(user)} className="text-success">showOrder</div></td>
                                <td>
                                <div className="email-box">
                                    <span className="short">{user?.address?.addressText?.slice(0, 20) ?? ''}...</span>
                                    <span className="full">{user?.address?.addressText ?? ''}</span>
                                </div>
                                </td>
                                <td>{user.typeOfPayment}</td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
            </div>
            
        </Container>
        </>
    )
}
export default Users