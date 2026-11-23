
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Mail,
  Lock,
  UserRound,
  Building2,
  CheckCircle2,
  Sparkles,
  ShieldCheck
} from "lucide-react";
import "./Auth.css";

function Auth({ onBack, onSuccess, onRegister }) {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    name: "",
    business: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const isRegister = mode === "register";

  function updateField(event) {
    setForm(previous => ({
      ...previous,
      [event.target.name]: event.target.value
    }));

    setError("");
    setSuccess("");
  }

  function switchMode(nextMode) {
    setMode(nextMode);
    setError("");
    setSuccess("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!form.email.trim() || !form.password) {
      setError("Please enter your email and password.");
      return;
    }

    if (isRegister) {
      if (!form.name.trim() || !form.business.trim()) {
        setError("Please complete your name and business name.");
        return;
      }

      if (form.password.length < 8) {
        setError("Password must contain at least 8 characters.");
        return;
      }

      if (form.password !== form.confirmPassword) {
        setError("Your passwords do not match.");
        return;
      }

      onRegister?.({
        name: form.name,
        business: form.business,
        email: form.email
      });

      return;
    }

    onSuccess?.();
  }

  function handleForgotPassword() {
    setError(
      "Password recovery will be available after authentication setup."
    );
  }

  return (
    <main className="auth-page">

      {/* Background atmosphere */}

      <div className="auth-background">
        <div className="auth-background-glow auth-glow-one" />
        <div className="auth-background-glow auth-glow-two" />
        <div className="auth-background-glow auth-glow-three" />

        <div className="auth-background-orb auth-orb-one" />
        <div className="auth-background-orb auth-orb-two" />

        <div className="auth-grain" />
        <div className="auth-background-grid" />
      </div>

      {/* Back navigation */}

      <button
        type="button"
        className="auth-back-button"
        onClick={onBack}
      >
        <ArrowLeft size={15} />
        <span>Back to website</span>
      </button>

      {/* Centered authentication layout */}

      <div className="auth-layout">

        <section className="auth-form-side">

          <div className="auth-form-card">

            {/* Brand */}

            <div className="auth-card-brand">
              <div className="auth-brand-mark">
                B
              </div>

              <div className="auth-brand-name">
                bizpilot<span>.</span>
              </div>

              <div className="auth-brand-caption">
                BUSINESS MANAGEMENT, SIMPLIFIED
              </div>
            </div>

            {/* Heading */}

            <div className="auth-form-heading">

              <span className="auth-overline">
                <Sparkles size={13} />

                {isRegister
                  ? "YOUR BUSINESS JOURNEY STARTS HERE"
                  : "WELCOME BACK"}
              </span>

              <h1>
                {isRegister
                  ? "Create your account"
                  : "Welcome back"}
                <span>.</span>
              </h1>

              <p>
                {isRegister
                  ? "Set up your account and bring everything your business needs into one place."
                  : "Sign in to your account and stay on top of your business."}
              </p>

            </div>

            {/* Login / Signup switch */}

            <div className="auth-mode-switch">

              <button
                type="button"
                className={!isRegister ? "active" : ""}
                onClick={() => switchMode("login")}
              >
                Sign in
              </button>

              <button
                type="button"
                className={isRegister ? "active" : ""}
                onClick={() => switchMode("register")}
              >
                Create account
              </button>

            </div>

            {/* Authentication form */}

            <form
              className="auth-form"
              onSubmit={handleSubmit}
            >

              {isRegister && (
                <>

                  <label className="auth-field">

                    <span className="auth-field-label">
                      Full name
                    </span>

                    <span className="auth-input-wrap">
                      <UserRound size={17} />

                      <input
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={updateField}
                        placeholder="Enter your full name"
                        autoComplete="name"
                        required
                      />
                    </span>

                  </label>

                  <label className="auth-field">

                    <span className="auth-field-label">
                      Business name
                    </span>

                    <span className="auth-input-wrap">
                      <Building2 size={17} />

                      <input
                        name="business"
                        type="text"
                        value={form.business}
                        onChange={updateField}
                        placeholder="Enter your business name"
                        autoComplete="organization"
                        required
                      />
                    </span>

                  </label>

                </>
              )}

              {/* Email */}

              <label className="auth-field">

                <span className="auth-field-label">
                  Email address
                </span>

                <span className="auth-input-wrap">
                  <Mail size={17} />

                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={updateField}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </span>

              </label>

              {/* Password */}

              <label className="auth-field">

                <span className="auth-field-label">
                  Password
                </span>

                <span className="auth-input-wrap">
                  <Lock size={17} />

                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={updateField}
                    placeholder={
                      isRegister
                        ? "At least 8 characters"
                        : "Enter your password"
                    }
                    autoComplete={
                      isRegister
                        ? "new-password"
                        : "current-password"
                    }
                    required
                  />

                  <button
                    type="button"
                    className="auth-eye-button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword
                      ? <EyeOff size={17} />
                      : <Eye size={17} />}
                  </button>

                </span>

              </label>

              {/* Remember me / Forgot password */}

              {!isRegister && (
                <div className="auth-form-options">

                  <label className="auth-remember">
                    <input type="checkbox" />

                    <span>Remember me</span>
                  </label>

                  <button
                    type="button"
                    className="auth-text-button"
                    onClick={handleForgotPassword}
                  >
                    Forgot password?
                  </button>

                </div>
              )}

              {/* Confirm password */}

              {isRegister && (
                <label className="auth-field">

                  <span className="auth-field-label">
                    Confirm password
                  </span>

                  <span className="auth-input-wrap">
                    <Lock size={17} />

                    <input
                      name="confirmPassword"
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      value={form.confirmPassword}
                      onChange={updateField}
                      placeholder="Re-enter your password"
                      autoComplete="new-password"
                      required
                    />

                    <button
                      type="button"
                      className="auth-eye-button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                    >
                      {showConfirmPassword
                        ? <EyeOff size={17} />
                        : <Eye size={17} />}
                    </button>

                  </span>

                </label>
              )}

              {/* Error / Success */}

              {error && (
                <p
                  className="auth-message auth-error"
                  role="alert"
                >
                  {error}
                </p>
              )}

              {success && (
                <p
                  className="auth-message auth-success"
                  role="status"
                >
                  {success}
                </p>
              )}

              {/* Submit */}

              <button
                type="submit"
                className="auth-submit-button"
              >

                <span>
                  {isRegister
                    ? "Create my account"
                    : "Sign in to BizPilot"}
                </span>

                <ArrowRight size={17} />

              </button>

            </form>

            {/* Switch login / signup */}

            <p className="auth-switch-text">

              {isRegister
                ? "Already have an account?"
                : "New to BizPilot?"}

              <button
                type="button"
                onClick={() =>
                  switchMode(isRegister ? "login" : "register")
                }
              >
                {isRegister
                  ? "Sign in"
                  : "Create an account"}
              </button>

            </p>

            {/* Security footer */}

            <div className="auth-security-note">
              <ShieldCheck size={15} />

              <span>
                Built for businesses that move forward.
              </span>
            </div>

          </div>

          {/* Page footer */}

          <div className="auth-page-footer">
            <span>© 2026 BIZPILOT</span>
            <span>BUSINESS MANAGEMENT, REIMAGINED</span>
          </div>

        </section>

      </div>

    </main>
  );
}

export default Auth;
