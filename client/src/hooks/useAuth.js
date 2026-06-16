import { useForm } from "react-hook-form";
import api from "../lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { loginUser } from "../api/authApi";
import { useNavigate } from "react-router";
import { setUser } from "../slices/userSlice";

export const useAuth = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm();

  const loginMutation = useMutation({
    mutationFn: loginUser,

    onSuccess: (response) => {
      dispatch(setUser(response.data));
      // console.log(response);
      reset();
      navigate("/");
    },

    onSuccess: (response) => {
      dispatch(setUser(response.data.user));
      reset();
      navigate("/");
    },

  });
  const onSubmit = async (data) => {
    let res = loginMutation.mutate(data)
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    watch
  }
}