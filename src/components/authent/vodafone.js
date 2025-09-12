import { useForm,Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaVodafone } from "../validations-constant"
import { useNavigate } from "react-router-dom"
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import "./card.css"
import Swal from 'sweetalert2'
import { removeCart } from "../../redux-tool/slice-cart";
import { useDispatch } from "react-redux";
function Vodafone(){
    let navigate=useNavigate()
    let dispatch=useDispatch()
    const {
        control,
        handleSubmit,
        formState: { errors,isValid },
      } = useForm({
        resolver: yupResolver(schemaVodafone),
        mode:"all"
      });
      const confirmed=()=>{
              Swal.fire({
              title: "confirmed!, a massege will arive you within a seconds",
              icon: "success",
              draggable: navigate("/")
        });
        dispatch(removeCart())
    }
    return(
        <div className="vodafone-form">
            <h3 className="text-info">vodafone number</h3>
            <form  onSubmit={handleSubmit(confirmed)}>
                <Controller
                name="phone"
                control={control}
                defaultValue=""
                render={({field})=>
                    <PhoneInput
                {...field}
                onChange={(value)=>field.onChange(value)}
                country={"eg"}
                inputClass="inputphone"
                containerClass="countainphone"
                buttonClass="buttonphone"
                localization={{
                    'EG': 'مصر',
                }}
                />
                }
                />
                {errors.phone&&<small className="d-block text-danger">{errors.phone.message}</small>}
                <button disabled={!isValid} onClick={()=>confirmed()} type="submit">send now</button>
            </form>

        </div>
    )
}
export default Vodafone