import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    setError("");
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    setMessage("");
    try {
      const res = await axios.post(BASE_URL + "/forgot-password", { emailId });
      setMessage(res.data);
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  // ── Forgot Password view ──────────────────────────────────────────
  if (isForgotPassword) {
    return (
      <div className="flex justify-center my-10">
        <div className="card bg-base-100 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center">Forgot Password</h2>
            <p className="text-sm text-center text-gray-500">
              Enter your registered email and we'll send you a reset link.
            </p>
            <fieldset className="fieldset mt-2">
              <legend className="fieldset-legend">Email ID</legend>
              <input
                type="email"
                className="input w-full"
                placeholder="you@example.com"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {message && <p className="text-green-600 text-sm">{message}</p>}
            <div className="card-actions justify-center mt-2">
              <button className="btn btn-primary w-full" onClick={handleForgotPassword}>
                Send Reset Link
              </button>
            </div>
            <p
              className="text-blue-500 text-sm text-center cursor-pointer mt-2"
              onClick={() => { setIsForgotPassword(false); setError(""); setMessage(""); }}
            >
              Back to Login
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Login / SignUp view ───────────────────────────────────────────
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          <div>
            {!isLoginForm && (
              <>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              </>
            )}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email ID</legend>
              <input
                type="text"
                className="input"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
          {isLoginForm && (
            <p
              className="text-blue-500 text-sm text-center cursor-pointer"
              onClick={() => { setIsForgotPassword(true); setError(""); }}
            >
              Forgot Password?
            </p>
          )}
          <p
            className="text-blue-500 m-auto cursor-pointer"
            onClick={() => { setIsLoginForm((v) => !v); setError(""); }}
          >
            {isLoginForm ? "New User? Sign Up Here" : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
