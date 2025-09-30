import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function Copy(){
 const [admin, setAdmin] = useState(false);
 const [passowrdCopy, setPasswordCopy] = useState(false);
 const [close,setClose]=useState(true)
  const email = "admin123@gmail.com";
  const password = "gold123";
  const handleEmail = () => {
    navigator.clipboard.writeText(email);
    setAdmin(true);
    setTimeout(() => setAdmin(false), 2000);
  };
  const handlePassword = () => {
    navigator.clipboard.writeText(password);
    setPasswordCopy(true);
    setTimeout(() => setPasswordCopy(false), 2000);
  };
    return(
        <>
        {close?<div className="experment text-muted">
            <div onClick={()=>setClose(false)}>x</div>
            <p className="mb-0 ps-2">
                <div
                    onClick={handleEmail}
                    className="copy-box"
                    title="اضغط للنسخ"
                    >
                    {email} {<FontAwesomeIcon icon={!admin?faCopy:faCheck} />}
                </div>
                <div
                    onClick={handlePassword}
                    className="copy-box"
                    title="اضغط للنسخ"
                    >
                    {password} {<FontAwesomeIcon icon={!passowrdCopy?faCopy:faCheck} />}
                </div>

            </p>
            <small className="mb-0 p-1">يمكنك تجربة الموقع بشكل كامل بدون تغيير كبير من فضلك</small>
          </div>:null}
        </>
    )
}
export default Copy