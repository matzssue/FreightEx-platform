import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({
  open,
  close,
  agreeHandler,
  content,
  title,
  description,
  label,
}) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={close}
        aria-labelledby={`alert-dialog-${title}`}
        aria-describedby={`alert-dialog-${description}`}
      >
        <DialogTitle id={`alert-dialog-${title}`}>{label}</DialogTitle>
        <DialogContent>
          <DialogContentText id={`alert-dialog-${description}`}>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Disagree</Button>
          <Button onClick={agreeHandler} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
