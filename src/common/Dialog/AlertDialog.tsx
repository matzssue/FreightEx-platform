import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ReactNode } from 'react';

type AlertDialogProps = {
  open: boolean;
  close: () => void;
  agreeHandler: () => void;
  children: ReactNode;
  title: string;
  description: string;
  label: string;
};

export default function AlertDialog({
  open,
  close,
  agreeHandler,
  children,
  title,
  description,
  label,
}: AlertDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={close}
      aria-labelledby={`alert-dialog-${title}`}
      aria-describedby={`alert-dialog-${description}`}
    >
      <DialogTitle id={`alert-dialog-${title}`}>{label}</DialogTitle>
      <DialogContent>
        <DialogContentText id={`alert-dialog-${description}`}>{children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Disagree</Button>
        <Button onClick={agreeHandler} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
