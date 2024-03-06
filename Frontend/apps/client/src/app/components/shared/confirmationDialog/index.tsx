import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';

interface IConfirmationDialog {
  open: boolean;
  title: string;
  content?: string;
  closeButtonText: string;
  okayButtonText: string;
  onClose: any;
  onOkay: any;
  showLoaderOnOkay?: boolean;
}

export default function ConfirmationDialog(props: IConfirmationDialog) {
  const { open, onClose, title, content, closeButtonText, okayButtonText, onOkay, showLoaderOnOkay } = props;
  
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {title && (
          <DialogTitle id="alert-dialog-title">
            {title}
          </DialogTitle>
        )}
        {content && (
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {content}
            </DialogContentText>
          </DialogContent>
        )}
        <DialogActions className='mt-3'>
          <Button disabled={showLoaderOnOkay} onClick={onClose} size='small' className='me-2 text-muted'>{closeButtonText}</Button>
          <Button disabled={showLoaderOnOkay} onClick={onOkay} size='small' variant='contained' color='error' autoFocus>
            {showLoaderOnOkay ? <CircularProgress color="inherit" size={12} /> : okayButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}