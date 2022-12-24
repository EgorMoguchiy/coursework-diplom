import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo_chat1.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      alert(123)
      return false;
    } else if (password === "") {
      alert(123)
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );

        navigate("/");
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
          </div>
          <input
            type="text"
            placeholder="Логин"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Пароль"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Вход</button>
          <span>
            Нет аккаунта ? <Link to="/register">Создать.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div` 
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  .brand {
    background-color: white;
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 7rem;
      margin-bottom: 10px;
    }
  }
  form {
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    border: 0.15rem solid #778899;
    border-radius: 2rem;
    padding: 2rem 3rem 1.9rem 3rem;
  }
  input {
    backgound-color: #E8F0FE;
    padding: 1rem;
    border: 0.14rem solid #778899;
    border-radius: 0.4rem;
    width: 100%;
    font-size: 1rem;
  }
  button {
    background-color: #0F6FC5;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #00416A;
    }
  }
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
`;