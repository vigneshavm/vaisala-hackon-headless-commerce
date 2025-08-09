import { useState, ChangeEvent, FormEvent } from "react";
import { signup, socialLogin } from "../api/userApi"; // socialLogin is your handler for social auth
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

interface SignupFormData {
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignupFormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signup();
      console.log("Signup success", res);
      navigate("/welcome");
    } catch {
      setError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Example social login handler
  const handleSocialLogin = async (provider: "google" | "facebook") => {
    setError("");
    setLoading(true);
    try {
      // This function should handle OAuth flow for provider and return user info or token
      const res = await socialLogin();
      console.log(`${provider} login success`, res);
      navigate("/welcome");
    } catch {
      setError(`${provider} login failed. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Background>
      <div className="container px-4 px-md-5 w-100">
        <div className="row gx-lg-5 align-items-center justify-content-center">
          {/* Left text */}
          <div className="col-lg-5 text-white mb-5 mb-lg-0">
            <Title>
              Create Account <br />
              <span>Sign up to get started</span>
            </Title>
            <SubTitle>
              Fill in your details to create your account securely or use social media.
            </SubTitle>
          </div>

          {/* Right form */}
          <div className="col-lg-5 position-relative">
            <Shape1 />
            <Shape2 />
            <GlassCard>
              {/* Social Buttons */}
              <div className="mb-4 d-flex flex-column gap-3">
                <button
                  className="btn btn-danger d-flex align-items-center justify-content-center"
                  onClick={() => handleSocialLogin("google")}
                  disabled={loading}
                  aria-label="Sign up with Google"
                >
                  <i className="bi bi-google me-2"></i> Sign up with Google
                </button>
                <button
                  className="btn btn-primary d-flex align-items-center justify-content-center"
                  onClick={() => handleSocialLogin("facebook")}
                  disabled={loading}
                  aria-label="Sign up with Facebook"
                >
                  <i className="bi bi-facebook me-2"></i> Sign up with Facebook
                </button>
              </div>

              <div className="text-center mb-3">
                <span className="text-muted">or sign up with email</span>
              </div>

              {/* Email Signup Form */}
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
                    minLength={6}
                  />
                  <label className="form-label">Password (min 6 characters)</label>
                </div>

                {/* Error */}
                {error && <div className="alert alert-danger py-2">{error}</div>}

                {/* Submit */}
                <FullWidthBtn
                  type="submit"
                  className="btn btn-primary btn-block mb-4"
                  disabled={loading}
                >
                  {loading ? "Signing up..." : "Sign Up"}
                </FullWidthBtn>

                {/* Login link */}
                <div className="text-center">
                  <a href="/" className="small text-muted">
                    Already have an account? Login
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

export default Signup;
