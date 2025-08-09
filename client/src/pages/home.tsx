import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/userApi";
import { useNavigate } from "react-router-dom";
import {
  Background,
  Shape1,
  Shape2,
  GlassCard,
  Title,
  SubTitle,
  FullWidthBtn,
} from "./home.styled";

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    // e.preventDefault();
    // setError("");
    // setLoading(true);

    // try {
    //   const res = await login(formData);
    //   console.log("Login success", res);
    //   // TODO: Store token or redirect here
    // } catch {
    //   setError("Invalid credentials. Please try again.");
    // } finally {
    //   setLoading(false);
    // }
  };
  return (
    <Background>
      <div className="container px-4 px-md-5 w-100">
        <div className="row gx-lg-5 align-items-center justify-content-center">
          {/* Left text */}
          <div className="col-lg-5 text-white mb-5 mb-lg-0">
            <Title>
              Welcome Back <br />
              <span>Please login to continue</span>
            </Title>
            <SubTitle>
              Enter your credentials to access your account securely.
            </SubTitle>
          </div>

          {/* Right form */}
          <div className="col-lg-5 position-relative">
            <Shape1 />
            <Shape2 />
            <GlassCard>
              <form onSubmit={handleSubmit}>
                {/* Email */}
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <label className="form-label">Email address</label>
                </div>

                {/* Password */}
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <label className="form-label">Password</label>
                </div>

                {/* Error */}
                {error && <div className="alert alert-danger py-2">{error}</div>}

                {/* Submit */}
                <FullWidthBtn
                  type="submit"
                  className="btn btn-primary btn-block mb-4"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </FullWidthBtn>

                {/* Forgot & Signup links */}
<div className="d-flex justify-content-between small text-muted mb-3">
  <a href="#!" className="">
    Forgot password?
  </a>
  <a href="/signup" className="">
    Sign Up
  </a>
</div>

              </form>
            </GlassCard>
          </div>
        </div>
      </div>
    </Background>
  );
};

export default Login;
