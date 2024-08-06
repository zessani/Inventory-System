'use client';

import { useState, useEffect } from 'react';
import { Box, Stack, Typography, Button, Modal, TextField, Menu, MenuItem } from '@mui/material';
import { firestore } from '@/myfirebase';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [unit, setUnit] = useState('kg');
  const [quantity, setQuantity] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (unit) => {
    setUnit(unit);
    setAnchorEl(null);
  };

  const handleQuantityChange = (e) => {
    const value = Number(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() });
    });
    setInventory(inventoryList);
  };

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity: currentQuantity, unit: currentUnit } = docSnap.data();
      await setDoc(docRef, { quantity: currentQuantity + quantity, unit: currentUnit });
    } else {
      await setDoc(docRef, { quantity, unit });
    }
    await updateInventory();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity: currentQuantity, unit: currentUnit } = docSnap.data();
      if (currentQuantity <= quantity) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: currentQuantity - quantity, unit: currentUnit });
      }
    }
    await updateInventory();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setItemName('');
    setQuantity(0); // Reset quantity
    setOpen(false);
  };

  const outlinedButtonStyle = {
    borderColor: '#09D4F8',
    color: '#09D4F8',
    borderRadius: '8px',
    '&:hover': {
      borderColor: '#FFFFFF',
      color: 'WHITE',
    },
  };

  useEffect(() => {
    updateInventory();
  }, []);

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      gap={2}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack
            width="100%"
            direction="row"
            spacing={2}
            sx={{
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
              borderRadius: '4px',
            }}
          >
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <TextField 
                label="Qty"
                type="number"
                variant="outlined"
                value={quantity}
                onChange={handleQuantityChange}
                sx={{ width: '300px' }}
              />
            <Button
                variant="outlined"
                onClick={handleOpenMenu}
                endIcon={<ArrowDropDownIcon />}
              >
                {unit}
              </Button>
              <Menu 
                
                anchorEl={anchorEl}
                open={openMenu}
                onClose={() => handleCloseMenu(unit)}
              >
                {['kg', 'g', 'litres', 'ml', 'ounces', 'pieces'].map((option) => (
                  <MenuItem
                    key={option}
                    onClick={() => handleCloseMenu(option)}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
              
              <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName);
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Button
        variant="outlined"
        sx={outlinedButtonStyle}
        onClick={handleOpen}
      >
        Add New Item
      </Button>
      <Box borderRadius="8px">
        <Box
          width="1000px"
          height="100px"
          bgcolor="#C5DBF2"
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius="8px"
        >
          <Typography variant="h3" color="#333" textAlign="center">
            Inventory 
          </Typography>
        </Box>
        <Stack borderRadius="8px" width="1000px" height="300px" spacing={2} overflow="auto">
          {inventory.map(({ name, quantity, unit }) => (
            <Box
              key={name}
              width="100%"
              minHeight="80px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              bgcolor="white"
              paddingX={5}
              sx={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
                borderRadius: '4px',
              }}
            >
              <Typography variant="h6" color="#333" textAlign="center">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Stack direction={"row"} spacing={2}>
                <Typography variant="h6" color="#333" textAlign="center">
                  {quantity}
                </Typography>
                <Typography variant="h6" color="#333" textAlign="center">
                  {unit}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={() => addItem(name)}>
                  Add
                </Button>
                <Button variant="contained" onClick={() => removeItem(name)}>
                  Remove
                </Button>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
