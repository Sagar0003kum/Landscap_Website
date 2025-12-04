import "./clients.css";
import Link from "next/link";

export default function AdminClientsPage() {
  return (
    <main className="admin-clients-wrapper">
      <h1 className="admin-clients-title">Manage Clients</h1>
      <p className="admin-clients-subtitle">
        View and manage all registered clients.
      </p>

      <section className="client-table">
        <div className="table-row table-header">
          <span>Name</span>
          <span>Email</span>
          <span>Phone</span>
          <span>Project Status</span>
          <span>Actions</span>
        </div>

        <div className="table-row">
          <span>Sagar Prajapati</span>
          <span>sagar@example.com</span>
          <span>403-123-4567</span>
          <span>In Progress</span>
          <div className="action-buttons">
            <Link href="#" className="table-btn">View</Link>
            <Link href="#" className="table-btn secondary">Edit</Link>
            <button className="table-btn danger">Delete</button>
          </div>
        </div>

        <div className="table-row">
          <span>John Smith</span>
          <span>john.smith@gmail.com</span>
          <span>587-880-3344</span>
          <span>Completed</span>
          <div className="action-buttons">
            <Link href="#" className="table-btn">View</Link>
            <Link href="#" className="table-btn secondary">Edit</Link>
            <button className="table-btn danger">Delete</button>
          </div>
        </div>

        <div className="table-row">
          <span>Riya Patel</span>
          <span>riya.patel@gmail.com</span>
          <span>403-555-7788</span>
          <span>Pending</span>
          <div className="action-buttons">
            <Link href="#" className="table-btn">View</Link>
            <Link href="#" className="table-btn secondary">Edit</Link>
            <button className="table-btn danger">Delete</button>
          </div>
        </div>
      </section>
    </main>
  );
}
