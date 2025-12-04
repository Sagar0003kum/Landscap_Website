import "./appointments.css";
import Link from "next/link";

export default function AdminAppointmentsPage() {
  return (
    <main className="admin-appointments-wrapper">

      {/* ---------------- HEADER ---------------- */}
      <h1 className="admin-appointments-title">Manage Appointments</h1>
      <p className="admin-appointments-subtitle">
        View and manage all scheduled client appointments.
      </p>

      {/* ---------------- APPOINTMENT TABLE ---------------- */}
      <section className="appointment-table">

        {/* ---- TABLE HEADER ---- */}
        <div className="table-row table-header">
          <span>Client</span>
          <span>Type</span>
          <span>Date</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {/* ---- APPOINTMENT 1 ---- */}
        <div className="table-row">
          <span>Sagar Prajapati</span>
          <span>Project Check-In</span>
          <span>Nov 10, 2024 – 3:00 PM</span>
          <span className="status confirm">Confirmed</span>

          <div className="action-buttons">
            <Link href="#" className="table-btn">View</Link>
            <Link href="#" className="table-btn secondary">Reschedule</Link>
            <button className="table-btn danger">Cancel</button>
          </div>
        </div>

        {/* ---- APPOINTMENT 2 ---- */}
        <div className="table-row">
          <span>John Smith</span>
          <span>Design Review</span>
          <span>Nov 14, 2024 – 11:00 AM</span>
          <span className="status pending">Pending</span>

          <div className="action-buttons">
            <Link href="#" className="table-btn">View</Link>
            <Link href="#" className="table-btn secondary">Reschedule</Link>
            <button className="table-btn danger">Cancel</button>
          </div>
        </div>

        {/* ---- APPOINTMENT 3 ---- */}
        <div className="table-row">
          <span>Riya Patel</span>
          <span>Initial Consultation</span>
          <span>Oct 22, 2024 – 2:30 PM</span>
          <span className="status completed">Completed ✔</span>

          <div className="action-buttons">
            <Link href="#" className="table-btn">View</Link>
            <Link href="#" className="table-btn secondary">Reschedule</Link>
            <button className="table-btn danger">Cancel</button>
          </div>
        </div>

      </section>

    </main>
  );
}
