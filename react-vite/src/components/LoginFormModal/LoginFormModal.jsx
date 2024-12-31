import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const navigate = useNavigate()

  const handleDemo = e => {
    e.preventDefault()
    dispatch(thunkLogin({credentials: "Demo", password: "password"}))
    closeModal()
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        credentials:email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
      navigate("/");
    }
  };

  return (
    <div className="login-modal">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label className="email-label">
          Email:
          <input
            className="input-email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.credentials && <p>{errors.credentials}</p>}
        <label className="password-label">
          Password:
          <input
            className="input-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <span className="form-buttons">
          <button type="submit">Log In</button>
          <button className="demo-user" onClick={handleDemo}>Demo</button>
        </span>
      </form>
    </div>
  );
}

export default LoginFormModal;
