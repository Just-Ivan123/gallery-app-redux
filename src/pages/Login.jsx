import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../store/user/userActions";
import { selectSignedIn } from "../store/user/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const isSignedIn = useSelector(selectSignedIn);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Проверка наличия заполненных полей
    if (!credentials.email || !credentials.password) {
      setErrors({
        form: "Please fill in all fields", // Установка общей ошибки для формы
      });
      return; // Прекращение выполнения функции
    }

    try {
      await dispatch(signInUser(credentials, navigate));
      setResponse("Signed in successfully!");
      setTimeout(() => {
        setResponse(""); // Очистка сообщения об успешной регистрации
      }, 3000);
    } catch (error) {
      console.error(error); // Обработка ошибки входа
      setErrors({
        form: error.message, // Установка общей ошибки для формы
      });
    }
  };

  

  return (
    <div>
      <h2 className="text-center">Login</h2>
      <form
        onSubmit={handleSubmit}
        className="container"
        style={{ width: "500px" }}
      >
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
          />
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
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;