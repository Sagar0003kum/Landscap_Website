import Link from "next/link";
import "./login.css";

export default function LoginPage(): JSX.Element {
  return (
    <main className="login-page">
      <section className="login-card">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">
          Sign in to access your quotes, projects and appointments.
        </p>

        {/* Google Sign-in */}
        <button className="google-btn" type="button">
          <span className="google-icon">G</span>
          <span>Continue with Google</span>
        </button>

        <div className="divider">
          <span className="divider-line" />
          <span className="divider-text">or</span>
          <span className="divider-line" />
        </div>

        {/* Email / Password form */}
        <form className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          <div className="login-actions-row">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <button className="link-btn" type="button">
              Forgot password?
            </button>
          </div>

          <button className="primary-btn full-width" type="submit">
            Sign In
          </button>
        </form>

        {/* Footer links */}
        <div className="login-footer">
          <p>
            New client?{" "}
            <button className="link-btn" type="button">
              Create an account
            </button>
          </p>
          <p className="admin-link">
            Are you an admin?{" "}
            <Link href="/admin/login" className="link-btn">
              Go to admin login
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
