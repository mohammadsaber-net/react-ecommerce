import * as yup from "yup"
export const schemaVodafone=yup.object().shape({
  phone: yup.string().required("Phone number is required")
})

export const visaSchema =yup.object().shape({
    number: yup.string().matches(/^[1-9]{16}$/,"invalid number").required("number is required"),
  name: yup.string().required("Name is required"),
  exp: yup.string().matches(/^[1-9]{2}\/[1-9]{2}$/,"expiry-date is required"),
  cvv: yup.string().matches(/^[1-9]{3}$/, "CVV number is required"),
}).required()
export const schema=yup.object().shape({
    name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
}).required()
export const loginSchema =yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
}).required()

export const addProductSchema=yup.object().shape({
  title:yup.string().required("title is required"),
  price:yup.string().matches(/^[1-9]\d*(\.[1-9]\d*)?$/,'invalid number').required("price is required"),
  description:yup.string().required("description is required"),
  category:yup.string().required("category is required"),
  image:yup.mixed().required("image is required")
  .test("is-file", "File is required", (value) => {
    return value && value.length > 0;
  })
  .test("file-type", "Only images are allowed", (value) => {
    if (value && value.length > 0) {
      return ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type);
    }
    return true;
  })
})