import React, { useEffect, useState } from "react";
import { createBike, deleteBike, getBikesListener, updateBike } from "../../../api/bikes";
import { Table, TextField } from "../../../components";
import AddIcon from '@mui/icons-material/AddBoxOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import {
  IconButton, Toolbar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, FormHelperText
} from '@mui/material';

export const BikeManager = () => {
  const [rows, setRows] = useState([]);
  const [addEditDialog, setAddEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const columns = [
    { id: 'model', label: 'Model', align: 'center', minWidth: 170 },
    { id: 'color', label: 'Color', align: 'center', minWidth: 100 },
    { id: 'location', label: 'Location', align: 'center', minWidth: 170 },
    { id: 'rating', label: 'Rating', align: 'center', minWidth: 100 },
    { id: 'available', label: 'Available', align: 'center', minWidth: 100 },
    { id: 'actions', label: 'Actions', align: 'center', minWidth: 100 }
  ];
  const onDelete = async (id) => {
    await deleteBike(id);
  }
  const onAddEdit = async (data) => {
    if (data.id) {
      await updateBike(data)
    } else {
      await createBike(data);
    }
  }
  const createRows = (rows) => {
    return rows.map(each => {
      return {
        ...each,
        available: each.available ? '✓' : '✕',
        actions: <>
          <IconButton color="primary" component="span" onClick={() => setAddEditDialog(each)}>
            <EditIcon />
          </IconButton>
          <IconButton color="primary" component="span" onClick={() => setDeleteDialog(each)}>
            <DeleteIcon />
          </IconButton>
        </>
      }
    })
  }
  useEffect(() => {
    getBikesListener({}, data => setRows(createRows(data)));
  }, []);
  const toolbar = (
    <Toolbar>
      <div style={{ flex: 1 }} />
      <IconButton color="primary" component="span" onClick={() => setAddEditDialog(true)}>
        <AddIcon />
      </IconButton>
    </Toolbar>
  )
  return (
    <>
      <Table columns={columns} rows={rows} toolbar={toolbar} />
      <BikeAddEditDialog onAddEdit={onAddEdit} open={addEditDialog} setOpen={setAddEditDialog} />
      <BikeDeleteDialog onDelete={onDelete} open={deleteDialog} setOpen={setDeleteDialog} />
    </>
  )
}

const BikeAddEditDialog = (props) => {
  const { open, setOpen, onAddEdit } = props;
  const [model, setModel] = useState(open?.model || '')
  const [color, setColor] = useState(open?.color || '')
  const [location, setLocation] = useState(open?.location || '')
  const [error, setError] = useState(false);
  useEffect(() => {
    setModel(open?.model);
    setColor(open?.color);
    setLocation(open?.location);
  }, [props.open])
  const handleClose = () => {
    setOpen(false);
  };
  const onSave = async () => {
    try {
      const params = { model, color, location };
      if (open?.id) {
        params.id = open.id;
      }
      await onAddEdit(params);
      handleClose();
    } catch (e) {
      setError(e);
    }
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Bike</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the details of bike you want to add.
        </DialogContentText>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              value={model}
              onChange={e => setModel(e.target.value)}
              autoFocus
              margin="dense"
              id="model"
              label="Model"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={color}
              onChange={e => setColor(e.target.value)}
              autoFocus
              margin="dense"
              id="color"
              label="Color"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={location}
              onChange={e => setLocation(e.target.value)}
              autoFocus
              id="location"
              label="Location"
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        {error && <DialogContentText style={{ flex: 1 }}>
          <FormHelperText error>{error.message}</FormHelperText>
        </DialogContentText>}
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={onSave}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}

const BikeDeleteDialog = ({ open, setOpen, onDelete }) => {
  const [error, setError] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleYes = async () => {
    try{
      await onDelete(open.id);
      handleClose();
    } catch (e) {
      setError(e);
    }
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Delete Bike</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this entry?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={handleYes}>Yes</Button>
      </DialogActions>
    </Dialog>
  )
}
