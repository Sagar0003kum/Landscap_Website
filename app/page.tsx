"use client";

import { useState, useEffect, MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";

import AuthModal from "./components/AuthModal";
import { useAuth } from "./context/AuthContext";

import "./home.css";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AccountCircle from "@mui/icons-material/AccountCircle";

export default function HomePage() {
  const [showAuth, setShowAuth] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const { user, logout } = useAuth();

  useEffect(() => {
    if (!user) {
      const alreadySeen = localStorage.getItem("hasSeenAuth");
      if (!alreadySeen) {
        setTimeout(() => {
          setShowAuth(true);
          localStorage.setItem("hasSeenAuth", "true");
        }, 800);
      }
    }
  }, [user]);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleLogoutClick = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      handleMenuClose();
    }
  };

  return (
    <>
      <AuthModal show={showAuth} onClose={() => setShowAuth(false)} />

      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{ px: 4, pt: 1 }}
      >
        <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#2f5b2f" }}>
            Landscape Craftsmen · Calgary, AB
          </Typography>

          {!user ? (
            <Button
              variant="outlined"
              size="small"
              onClick={() => setShowAuth(true)}
              sx={{
                textTransform: "none",
                borderRadius: "999px",
                borderColor: "#2f5b2f",
                color: "#2f5b2f",
                "&:hover": { borderColor: "#204020", backgroundColor: "#f1f7f1" },
              }}
            >
              Login / Sign Up
            </Button>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                size="small"
                onClick={handleMenuOpen}
                sx={{ mr: 1, color: "#2f5b2f" }}
              >
                <AccountCircle />
              </IconButton>
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, color: "#2f5b2f", cursor: "pointer" }}
                onClick={handleMenuOpen}
              >
                {user.displayName || user.email}
              </Typography>

              <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <main className="home-wrapper">
        <section className="hero-section">
          <div className="hero-content">
            <p className="hero-kicker">LANDSCAPE CRAFTSMEN · CALGARY, AB</p>

            <h1 className="hero-title">The Contracting Company You Can Trust</h1>

            <p className="hero-subtitle">
              Custom decks, fences, pergolas and full-yard makeovers—built
              properly by experienced tradespeople who care about the details.
            </p>

            <div className="hero-buttons">
              <Link href="/appointment" className="primary-btn">
                Schedule an Appointment
              </Link>
              <Link href="/estimate" className="secondary-btn">
                Get a Free Estimate
              </Link>
            </div>

            <div className="hero-tags">
              <span>Licensed & Insured</span>
              <span>Decks · Fences · Pergolas · Sod</span>
            </div>
          </div>

          <div className="hero-image">
            <div className="hero-image-card">
              <Image
                src="/projects/project-1.JPG"
                alt="Freshly built cedar deck"
                fill
                className="hero-image-photo"
              />
            </div>
          </div>
        </section>

        <section className="projects-preview">
          <div className="section-header">
            <h2>Our Recent Projects</h2>
            <p>
              A small sample of the decks, fences and outdoor spaces we’ve built
              around Calgary.
            </p>
          </div>

          <div className="project-grid">
            <div className="project-card">
              <Image
                src="/projects/project-2.JPG"
                alt="Row of new decks"
                fill
                className="project-photo"
              />
            </div>

            <div className="project-card">
              <Image
                src="/projects/project-3.JPG"
                alt="Covered deck with railing"
                fill
                className="project-photo"
              />
            </div>

            <div className="project-card">
              <Image
                src="/projects/project-4.JPG"
                alt="Backyard patio and pergola"
                fill
                className="project-photo"
              />
            </div>
          </div>

          <Link href="/projects" className="see-more">
            See More Projects →
          </Link>
        </section>

        <section className="services-preview">
          <div className="section-header">
            <h2>What We Offer</h2>
            <p>
              From simple starter decks to complete outdoor living spaces, we
              handle everything from design to clean-up.
            </p>
          </div>

          <div className="services-grid">
            <article className="service-card">
              <h3>Custom Decks & Railings</h3>
              <p>
                Pressure treated, cedar or composite decks built to code with
                clean finishes and long-lasting protection.
              </p>
            </article>

            <article className="service-card">
              <h3>Fences & Privacy Solutions</h3>
              <p>
                Solid wood fences, screens and gates that add privacy,
                security and a polished look to your yard.
              </p>
            </article>

            <article className="service-card">
              <h3>Pergolas & Outdoor Structures</h3>
              <p>
                Shade structures, covered decks and pergolas tailored to your
                home and how you actually use the space.
              </p>
            </article>

            <article className="service-card">
              <h3>Sod & Yard Refresh</h3>
              <p>
                Final grading, new sod and tidy details so your new build or
                renovation is ready to enjoy right away.
              </p>
            </article>
          </div>
        </section>

        <section className="about-preview">
          <div className="about-text">
            <h2>Why Homeowners Choose Landscape Craftsmen</h2>
            <p>
              Our crews bring years of field experience and a focus on doing the
              job right the first time—from layout and footings to the last screw.
            </p>
            <ul>
              <li>Clear, written quotes with no surprises</li>
              <li>Code-compliant structure and safe, solid stairs</li>
              <li>Flexible scheduling around Calgary’s weather</li>
              <li>Friendly, professional crew on every project</li>
            </ul>
          </div>

          <div className="about-photo-wrap">
            <div className="about-photo-card">
              <Image
                src="/projects/project-1.JPG"
                alt="Finished deck with seating"
                fill
                className="about-photo"
              />
            </div>
          </div>
        </section>

        <section className="testimonials-section">
          <h2>What Our Clients Say</h2>

          <div className="testimonials-grid">
            <article className="testimonial-card">
              <p className="testimonial-quote">
                “The new deck turned out better than we imagined. The crew was
                professional, on time and left everything clean.”
              </p>
              <p className="testimonial-name">– Amanda · SE Calgary</p>
            </article>

            <article className="testimonial-card">
              <p className="testimonial-quote">
                “They handled our fence and sod. Clear pricing, great
                communication and fast work.”
              </p>
              <p className="testimonial-name">– Jason · Cornerstone</p>
            </article>

            <article className="testimonial-card">
              <p className="testimonial-quote">
                “Very happy with the pergola and privacy screen. Solid work.”
              </p>
              <p className="testimonial-name">– Kiran · NW Calgary</p>
            </article>
          </div>
        </section>

        <section className="cta-banner">
          <div className="cta-content">
            <h2>Ready to Start Your Next Project?</h2>
            <p>
              Send us a few details about your yard and we’ll follow up with a
              friendly, no-pressure estimate.
            </p>
          </div>

          <div className="cta-actions">
            <Link href="/estimate" className="primary-btn cta-btn">
              Get a Free Estimate
            </Link>
            <Link href="/appointment" className="secondary-btn cta-btn-secondary">
              Book an Appointment
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
