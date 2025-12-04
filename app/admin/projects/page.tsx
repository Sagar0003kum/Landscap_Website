import "./projects.css";
import Link from "next/link";

export default function AdminProjectsPage() {
  return (
    <main className="admin-projects-wrapper">

      {/* ---------------- HEADER ---------------- */}
      <h1 className="admin-projects-title">Manage Projects</h1>
      <p className="admin-projects-subtitle">
        View and manage all active and completed projects.
      </p>

      {/* ---------------- PROJECT TABLE ---------------- */}
      <section className="project-table">

        {/* ---- TABLE HEADER ---- */}
        <div className="table-row table-header">
          <span>Project</span>
          <span>Client</span>
          <span>Start Date</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {/* ---- PROJECT 1 ---- */}
        <div className="table-row">
          <span>Full Landscaping</span>
          <span>Sagar Prajapati</span>
          <span>Oct 20, 2024</span>
          <span>In Progress</span>

          <div className="action-buttons">
            <Link href="#" className="table-btn">View</Link>
            <Link href="#" className="table-btn secondary">Update</Link>
            <button className="table-btn danger">Delete</button>
          </div>
        </div>

        {/* ---- PROJECT 2 ---- */}
        <div className="table-row">
          <span>Driveway Concrete</span>
          <span>John Smith</span>
          <span>Sep 02, 2024</span>
          <span>Completed ✔</span>

          <div className="action-buttons">
            <Link href="#" className="table-btn">View</Link>
            <Link href="#" className="table-btn secondary">Update</Link>
            <button className="table-btn danger">Delete</button>
          </div>
        </div>

        {/* ---- PROJECT 3 ---- */}
        <div className="table-row">
          <span>Backyard Patio</span>
          <span>Riya Patel</span>
          <span>Pending</span>
          <span>Pending</span>

          <div className="action-buttons">
            <Link href="#" className="table-btn">View</Link>
            <Link href="#" className="table-btn secondary">Update</Link>
            <button className="table-btn danger">Delete</button>
          </div>
        </div>

      </section>

    </main>
  );
}
