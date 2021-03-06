import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';

export default function AlertDialog({
    wording,
    wordingButton,
    variant='outlined',
    onClickAction,
    title,
    isDisable = false,
    openDefault=false,
    showInitButton=undefined,
}) {
  const [open, setOpen] = React.useState(openDefault);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const onClickActionAndClose = (event) => {
    onClickAction()
    handleClose()
  }

  return (
    <Box>
      {
        showInitButton ?
          showInitButton
        : 
        <Button variant={variant} onClick={handleClickOpen} disabled={isDisable}>
          {wordingButton}
        </Button>
      }
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {wording}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onClickActionAndClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
