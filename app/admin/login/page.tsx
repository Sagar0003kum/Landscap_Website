import "./admin-login.css";
import Link from "next/link";

export default function AdminLoginPage() {
  return (
    <main className="admin-login-wrapper">

      {/* ---------------- ADMIN LOGIN CARD ---------------- */}
      <div className="admin-card">
        <h1 className="admin-title">Admin Login</h1>
        <p className="admin-subtitle">Restricted access – authorized staff only.</p>

        {/* Email */}
        <label htmlFor="email" className="admin-label">Admin Email</label>
        <input
          id="email"
          type="email"
          placeholder="admin@example.com"
          className="admin-input"
        />

        {/* Password */}
        <label htmlFor="password" className="admin-label">Password</label>
        <input
          id="password"
          type="password"
          placeholder="••••••••"
          className="admin-input"
        />

        {/* Login Button */}
        <button className="admin-login-btn">Login</button>

        {/* Back to client login */}
        <p className="admin-footer">
          Not an admin?{" "}
          <Link href="/login" className="admin-link">
            Go to Client Login
          </Link>
        </p>
      </div>

    </main>
  );
}
