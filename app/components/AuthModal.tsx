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
  DialogActions,
  TextField,
  Button,
  Typography,
  IconButton,
  Box,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

export default function AuthModal({ show, onClose }) {
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

      // Set display name
      await updateProfile(userCred.user, { displayName: name });

      // Send email verification
      await sendEmailVerification(userCred.user);

      alert("Verification email sent! Check your inbox.");
      onClose();
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleLogin() {
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onClose();
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <Dialog open={show} onClose={onClose} fullWidth maxWidth="xs">
      {/* HEADER */}
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          component="span"
          variant="h6"
          sx={{ fontWeight: "bold" }}
        >
          {mode === "login" ? "Login" : "Create an Account"}
        </Typography>

        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* FORM */}
      <DialogContent>
        {mode === "signup" && (
          <TextField
            label="Full Name"
            fullWidth
            margin="dense"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <TextField
          label="Email Address"
          fullWidth
          margin="dense"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Password"
          fullWidth
          type="password"
          margin="dense"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {mode === "signup" && (
          <TextField
            label="Confirm Password"
            fullWidth
            type="password"
            margin="dense"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        )}

        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
      </DialogContent>

      {/* ACTION BUTTONS */}
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          variant="contained"
          fullWidth
          sx={{ py: 1, borderRadius: "8px" }}
          onClick={mode === "login" ? handleLogin : handleSignup}
        >
          {mode === "login" ? "Login" : "Sign Up"}
        </Button>
      </DialogActions>

      {/* SWITCH MODE */}
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Typography>
          {mode === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <span
            style={{ color: "#1976d2", cursor: "pointer", fontWeight: "bold" }}
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
          >
            {mode === "login" ? "Sign Up" : "Login"}
          </span>
        </Typography>
      </Box>
    </Dialog>
  );
}
