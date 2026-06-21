import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    setError("");
    setMessage("");
    if (newPassword !== confirmPassword) {
      return setError("Passwords do not match");
    }
    try {
      const res = await axios.post(BASE_URL + "/reset-password/" + token, {
        newPassword,
      });
      setMessage(res.data);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Reset Password</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">New Password</legend>
            <input
              type="password"
              className="input w-full"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Confirm Password</legend>
            <input
              type="password"
              className="input w-full"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </fieldset>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && (
            <p className="text-green-600 text-sm">
              {message} Redirecting to login...
            </p>
          )}
          <div className="card-actions justify-center mt-2">
            <button className="btn btn-primary w-full" onClick={handleReset}>
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
