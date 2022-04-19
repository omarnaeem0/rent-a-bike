import React, { useEffect, useState } from "react";
import { createAccount, deleteAccount, getAccountsListener, updateAccount } from "../../../api/accounts";
import { Table, TextField } from "../../../components";
import AddIcon from '@mui/icons-material/AddBoxOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import {
  IconButton, Toolbar, Button, Dialog, DialogActions, Typography,
  DialogContent, DialogContentText, DialogTitle, Grid, FormHelperText
} from '@mui/material';

export const AccountManager = () => {
  const [rows, setRows] = useState([]);
  const [editDialog, setEditDialog] = useState(false);
  // const [deleteDialog, setDeleteDialog] = useState(false);
  const columns = [
    { id: 'name', label: 'Name', align: 'center', minWidth: 170 },
    { id: 'email', label: 'Email', align: 'center', minWidth: 170 },
    { id: 'role', label: 'Role', align: 'center', minWidth: 170 },
    { id: 'actions', label: 'Actions', align: 'center', minWidth: 100 }
  ];
  // const onDelete = async (id) => {
  //   await deleteAccount(id);
  // }
  const onEdit = async (data) => {
      await updateAccount(data)
  }
  const createRows = (rows) => {
    return rows.map(each => {
      return {
        ...each,
        available: each.available ? '✓' : '✕',
        actions: <>
          <IconButton color="primary" component="span" onClick={() => setEditDialog(each)}>
            <EditIcon />
          </IconButton>
          {/* <IconButton color="primary" component="span" onClick={() => setDeleteDialog(each)}>
            <DeleteIcon />
          </IconButton> */}
        </>
      }
    })
  }
  useEffect(() => {
    getAccountsListener({}, data => setRows(createRows(data)));
  }, []);
  const toolbar = (
    <Toolbar>
      <Typography variant="h7" component="div" >
        Account Manager
      </Typography>
      <div style={{ flex: 1 }} />
      {/* <IconButton color="primary" component="span" onClick={() => setEditDialog(true)}>
        <AddIcon />
      </IconButton> */}
    </Toolbar>
  )
  return (
    <>
      <Table columns={columns} rows={rows} toolbar={toolbar} />
      <AccountEditDialog onEdit={onEdit} open={editDialog} setOpen={setEditDialog} />
      {/* <AccountDeleteDialog onDelete={onDelete} open={deleteDialog} setOpen={setDeleteDialog} /> */}
    </>
  )
}

const AccountEditDialog = (props) => {
  const { open, setOpen, onEdit } = props;
  const [name, setName] = useState(open?.name || '')
  const [role, setRole] = useState(open?.role || '')
  const [error, setError] = useState(false);
  useEffect(() => {
    setName(open?.name);
    setRole(open?.role);
  }, [props.open])
  const handleClose = () => {
    setOpen(false);
  };
  const onSave = async () => {
    try {
      const params = { uid: open.uid, name, role };
      await onEdit(params);
      handleClose();
    } catch (e) {
      setError(e);
    }
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Account</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please make your desired changes.
        </DialogContentText>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              value={name}
              onChange={e => setName(e.target.value)}
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={role}
              onChange={e => setRole(e.target.value)}
              autoFocus
              id="role"
              label="Role"
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

// const AccountDeleteDialog = ({ open, setOpen, onDelete }) => {
//   const [error, setError] = useState(false);
//   const handleClose = () => {
//     setOpen(false);
//   };
//   const handleYes = async () => {
//     try {
//       await onDelete(open.id);
//       handleClose();
//     } catch (e) {
//       setError(e);
//     }
//   }
//   return (
//     <Dialog
//       open={open}
//       onClose={handleClose}
//     >
//       <DialogTitle>Delete Account</DialogTitle>
//       <DialogContent>
//         <DialogContentText>
//           Are you sure you want to delete this entry?
//         </DialogContentText>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleClose}>No</Button>
//         <Button onClick={handleYes}>Yes</Button>
//       </DialogActions>
//     </Dialog>
//   )
// }
