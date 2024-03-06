import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { installSoftware } from '@infralastic/global-state';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { InputGroup, Form } from 'react-bootstrap';
import {BiSearch } from 'react-icons/bi';



export interface SoftwareInstallationModalProps {
  open: boolean;
  onClose: () => void;
  list: any;
}

function SoftwareInstallationModal(props: SoftwareInstallationModalProps) {
  const { onClose, open, list } = props;
  const [searchParams] = useSearchParams();
  const agentId: any = searchParams.get('agentId');
  const [visibleSoftwareCount, setVisibleSoftwareCount] = useState(100);
  const [searchQuery, setSearchQuery] = useState('');


  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = async (name: string) => {
    if (name && agentId && agentId !== 'null' && agentId !== 'undefined') {
      const formData = {
        name,
        agentId,
      };

      try {
        const res = await installSoftware(formData);

        if (res.data) {
          toast.success(`${name} installed successfully!`);
        } else {
          toast.error(`${name} installation failed.`);
        }
      } catch (error) {
        console.error('An error occurred during installation:', error);
        toast.error('An error occurred during installation');
      }
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const bottom =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      e.currentTarget.clientHeight;

    if (bottom) {
      // User has scrolled to the bottom; load more software
      setVisibleSoftwareCount((prevCount) => prevCount + 100);
    }
  };

  useEffect(() => {
    // Reset visible software count when the dialog opens
    if (open) {
      setVisibleSoftwareCount(100);
    }
  }, [open]);

  const filteredSoftware = searchQuery.length >= 2
  ? list.data?.filter((l: any) =>
      l.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : list.data;



  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Select software for installation</DialogTitle>
      {/* search */}
      <div className='dialogue-search'>
        <div className="ps-5 custon-width">
            <InputGroup className="shadow p-2 bg-white rounded">
              <InputGroup.Text className="bg-white border-0" id="basic-addon1">
                <BiSearch size={22} />
              </InputGroup.Text>
              <Form.Control
                className="header-input border-0"
                placeholder="Search Software"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
        </div>
      </div>
      <div onScroll={handleScroll} style={{ overflowY: 'scroll', maxHeight: '500px' }}>
        <List sx={{ pt: 0 }}>
          {filteredSoftware?.slice(0, visibleSoftwareCount).map((l: any) => (
            <ListItem disableGutters key={l.name}>
              <ListItemButton onClick={() => handleListItemClick(l.name)}>
                <ListItemText primary={l.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
    </Dialog>
  );
}

export default SoftwareInstallationModal;
