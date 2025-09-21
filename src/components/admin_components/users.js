import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Container} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUsersOrders } from "../../redux-tool/slice-usersOrders";
import Spinner from "../spinner&slider/spinner";

function Users(){
    const [managment,setManagment]=useState(false)
    const navigate=useNavigate()
    const {loading,data}=useSelector(state=>state.getUsers)
    const users=data?.orders||[]
    const login=useSelector(state=>state.adminLogin.userInfo)
    useEffect(()=>{
          const admin = localStorage.getItem('token');
          if (admin) {
            try {
              const decodedToken = jwtDecode(admin);
              if (decodedToken.exp * 1000 < Date.now()) {
                localStorage.removeItem("token");
                setManagment(false);
                navigate("/login");
                toast.error("Session expired. Please log in again.");
                return;
              }
              if (decodedToken.role === 'ADMIN') {
                setManagment(true);
              }else{
                navigate("/")
                setManagment(false);
              }
            } catch (error) {
              navigate("/")
              setManagment(false);
              console.error("Failed to decode token:", error);
            }
          }else{
            navigate("/")
            setManagment(false);
          }
        }, [login]);
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
        {managment && <Container className="mt-80">
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
            
        </Container>}
        </>
    )
}
export default Users