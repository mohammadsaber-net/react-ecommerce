import { useDispatch, useSelector } from "react-redux"
import { fetchUserRecieved } from "../../redux-tool/slice.userRecieved"
import { useEffect, useState } from "react";

function Client(params){
    const dispatch=useDispatch()
    const user = useSelector(state =>
    state.getUsers.data?.orders?.find(u => u._id === params.userId)
    );
    const orders = user?.items || [];

  const changeTorecieved = (id) => {
    dispatch(fetchUserRecieved({ update: params.userId, id }));
    };
    return(
        <div className="form-container">
                <div className="form">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 className="form-title">Client Orders</h3>
                        <div className="close-button" onClick={() =>params.setOrder(false)}>X</div>
                    </div>
                    <div className="client">
                         <table className="table manage-table table-border">
                        <thead>
                            <tr>
                                <th>title</th>
                                <th>price</th>
                                <th>amount</th>
                                <th>date</th>
                                <th>received</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((product)=>{
                                return(
                                <tr key={product.product._id} className={!product.received?"table-light":""}>
                                    <td>{product.product.title.slice(0,15)}</td>
                                    <td>{product.product.price} EGP</td>
                                    <td>{product.quantity}</td>
                                    <td>
                                        {new Date(product.date).toLocaleDateString('en-US', {
                                            month: '2-digit',
                                            day: '2-digit',
                                            year: '2-digit'
                                        })}
                                    </td>
                                    <td><div className={`receive ${product.received?"yes":""}`} onClick={()=>changeTorecieved(product.product._id)}>{product.received===false?"no":"yes"}</div></td>
                                </tr>
                            )})}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
    )
}
export default Client