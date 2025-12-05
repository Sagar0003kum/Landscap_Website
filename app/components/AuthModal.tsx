/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { auth } from "../firebase/config";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";

// MUI Components
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

export default function AuthModal({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) {
  const [mode, setMode] = useState<"login" | "signup">("login");
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

      alert("Verification email sent! Please check your inbox.");

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
        {/* FIXED: prevents <h6> inside <h2> error */}
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          {mode === "login" ? "Login" : "Create an Account"}
        </Typography>

        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* FORM CONTENT */}
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          paddingBottom: 3,
        }}
      >
        {mode === "signup" && (
          <TextField
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
        )}

        <TextField
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />

        {mode === "signup" && (
          <TextField
            label="Confirm Password"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            fullWidth
          />
        )}

        {error && (
          <Typography color="error" sx={{ fontSize: "14px" }}>
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          fullWidth
          sx={{ background: "#2e7d32", padding: "10px", mt: 1 }}
          onClick={mode === "login" ? handleLogin : handleSignup}
        >
          {mode === "login" ? "Login" : "Sign Up"}
        </Button>

        <Box textAlign="center" mt={1}>
          <Typography variant="body2">
            {mode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}

            <span
              style={{
                color: "#2e7d32",
                marginLeft: "5px",
                cursor: "pointer",
                fontWeight: 600,
              }}
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
            >
              {mode === "login" ? "Sign Up" : "Login"}
            </span>
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
