
import { useEffect} from "react";
import { Container} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUsersOrders } from "../../redux-tool/slice-usersOrders";
import Spinner from "../spinner&slider/spinner";
import { useNavigate } from "react-router-dom";

function Users(){
    const {loading,data}=useSelector(state=>state.getUsers)
    const users=data?.orders||[]
    const navigate=useNavigate()
        const dispatch=useDispatch()
        useEffect(()=>{
            dispatch(getUsersOrders())
        },[])
        const showOrders=(data)=>{
          console.log(data)
        }
    return(
        <>
        {loading&&<Spinner />}
        <Container className="mt-80">
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
                                <td>{user.name}</td>
                                <td className="text-primary">
                                  <div class="email-box">
                                    <span class="short">{user.email.slice(0, 5)}...</span>
                                    <span class="full">{user.email}</span>
                                  </div>
                                </td>
                                <td>{user.phone}</td>
                                <td><div style={{cursor:"pointer"}} onClick={()=>showOrders(user.items)} className="text-success">showOrder</div></td>
                                <td>{user.address.addressText}</td>
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