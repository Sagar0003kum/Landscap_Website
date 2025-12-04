"use client";

import { useState } from "react";
import { auth } from "../firebase/config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type AuthModalProps = {
  show: boolean;
  onClose: () => void;
};

export default function AuthModal({ show, onClose }: AuthModalProps) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  if (!show) return null;

  async function handleSignup() {
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCred.user, { displayName: name });

      await sendEmailVerification(userCred.user);

      alert("Verification email sent! Check your inbox.");
      onClose();
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleLogin() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onClose();
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <Dialog open={show} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {mode === "login" ? "Login" : "Create an Account"}
        </Typography>

        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {mode === "signup" && (
          <TextField
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
        )}

        <TextField
          type="email"
          label="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />

        <TextField
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />

        {mode === "signup" && (
          <TextField
            type="password"
            label="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            fullWidth
          />
        )}

        {error && (
          <Typography color="error" sx={{ fontSize: "0.9rem" }}>
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          color="success"
          onClick={mode === "login" ? handleLogin : handleSignup}
          sx={{ mt: 1, py: 1.2 }}
        >
          {mode === "login" ? "Login" : "Sign Up"}
        </Button>

        <Typography align="center" sx={{ mt: 1 }}>
          {mode === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <span
            style={{
              color: "#2e7d32",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
          >
            {mode === "login" ? "Sign Up" : "Login"}
          </span>
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
