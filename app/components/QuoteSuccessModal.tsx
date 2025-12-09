"use client";

import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";


type QuoteSuccessModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function QuoteSuccessModal({
  open,
  onClose,
}: QuoteSuccessModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <Paper
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          p: 4,
          maxWidth: 400,
          width: "90%",
          borderRadius: 3,
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h6" fontWeight={600}>
            Quote request sent
          </Typography>

          <Typography variant="body1">
            Your quote request was sent successfully. Please check your inbox.
          </Typography>

          <Button
            variant="contained"
            fullWidth
            sx={{ background: "#2e7d32", padding: "10px", mt: 1 }}
            onClick={onClose}
          >
            Close
          </Button>
        </Stack>
      </Paper>
    </Modal>
  );
}
