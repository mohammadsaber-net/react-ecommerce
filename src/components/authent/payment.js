// src/components/PaymentForm.js
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initiatePayment} from "../../redux-tool/paymentSlice";

const PaymentForm = () => {
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();
  const { loading,error, paymentUrl } = useSelector((state) => state.payment);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(initiatePayment(amount));
  };
  useEffect(() => {
    
  }, [paymentUrl, dispatch]);

  return (
    <div className="mt-80 text-center">
      {!paymentUrl ? (
        <>
          <h2>إدفع الآن</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="number"
              placeholder="أدخل المبلغ بالجنيه"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "جارٍ المعالجة..." : "إدفع"}
            </button>
          </form>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </>
      ) : (
        <div>
          <h3 className="mb-0">complete your payment please:</h3>
          <iframe
            src={paymentUrl}
            title="Paymob Payment"
            height={1000}
            style={{ border: "none",width:"100%"}}
          />
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
