import { ReactNode } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type AlertDialogProps = {
  agreeHandler: (e: any) => void;
  children: ReactNode;
  close: () => void;
  description: string;
  label: string;
  open: boolean;
  title: string;
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
        <Button onClick={agreeHandler}>Agree</Button>
      </DialogActions>
    </Dialog>
  );
}
