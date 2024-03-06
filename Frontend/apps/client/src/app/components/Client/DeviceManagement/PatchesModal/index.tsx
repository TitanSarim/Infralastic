import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { installPatches } from '@infralastic/global-state';
import { useSearchParams } from "react-router-dom";
import { toast } from 'react-toastify';

export interface PatchesModalProps {
  open: boolean;
  onClose: () => void;
  list: any
}

function PatchesModal(props: PatchesModalProps) {
    const { onClose, open, list } = props;
    const [searchParams] = useSearchParams();
    const agentId: any = searchParams.get('agentId');

    const handleClose = () => {
        onClose();
    };

    const handleListItemClick = async () => {
        if (agentId && agentId !== 'null' && agentId !== 'undefined') {
          try {
            const res = await installPatches({ agentId });
      
            if (res.data) {
              toast.success("Patch installed successfully!");
            } else {
              toast.error("Patch installation failed.");
            }
          } catch (error) {
            console.error('An error occurred during installation:', error);
            toast.error("An error occurred during installation");
          }
        }
    };
      

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Select patch for installation</DialogTitle>
      <List sx={{ pt: 0 }}>
        {list?.map((l: any) => (
          <ListItem disableGutters key={l.guid}>
            <ListItemButton onClick={() => handleListItemClick()}>
              <ListItemText primary={l.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default PatchesModal