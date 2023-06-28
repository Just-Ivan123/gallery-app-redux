import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../store/user/userActions";
import { selectSignedIn } from "../store/user/userSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const isSignedIn = useSelector(selectSignedIn);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState("");

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;

    setUser((prevState) => ({
      ...prevState,
      [name]: inputValue,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Проверка наличия заполненных полей
    if (
      !user.first_name ||
      !user.last_name ||
      !user.email ||
      !user.password ||
      !user.password_confirmation ||
      !user.terms
    ) {
      setErrors({
        form: "Please fill in all fields", // Установка общей ошибки для формы
      });
      return; // Прекращение выполнения функции
    }

    try {
      await dispatch(signUpUser(user, navigate));
      setResponse("Registration successful!");
      setUser({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        terms: false,
      });
      setErrors({});
      setTimeout(() => {
        setResponse(""); // Очистка сообщения об успешной регистрации
      }, 3000);
    } catch (error) {
      console.error(error); // Обработка ошибки регистрации
      setErrors({
        form: error.message, // Установка общей ошибки для формы
      });
    }
  };

  

  return (
    <div>
      <h2 className="text-center">Register</h2>
      <form
        onSubmit={handleSubmit}
        className="container"
        style={{ width: "500px" }}
      >
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="first_name"
            placeholder="First Name"
            value={user.first_name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="last_name"
            placeholder="Last Name"
            value={user.last_name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            name="password_confirmation"
            placeholder="Confirm Password"
            value={user.password_confirmation}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="terms"
            checked={user.terms}
            onChange={handleChange}
          />
          <label className="form-check-label">
            I accept the terms and conditions
          </label>
        </div>
        {errors.form && (
          <div className="alert alert-danger" role="alert">
            {errors.form}
          </div>
        )}
        {response && (
          <div className="alert alert-success" role="alert">
            {response}
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;