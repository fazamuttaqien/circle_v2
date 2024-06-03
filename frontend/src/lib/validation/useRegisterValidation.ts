import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export interface IRegisterForm {
  fullname: string;
  username: string;
  email: string;
  password: string;
}

const useLoginValidation = () => {
  const initialValue: IRegisterForm = {
    fullname: "",
    username: "",
    email: "",
    password: "",
  };

  const schema = yup.object().shape({
    fullname: yup.string().required(),
    username: yup.string().required(),
    email: yup.string().required(),
    password: yup
      .string()
      .required("tolong isi emailnya cok")
      .min(6, "Password must be at least 8 characters"),
  });

  return useForm<IRegisterForm>({
    defaultValues: initialValue,
    mode: "all",
    reValidateMode: "onBlur",
    resolver: yupResolver(schema),
  });
};

export default useLoginValidation;
