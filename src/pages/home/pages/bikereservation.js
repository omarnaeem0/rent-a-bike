import React, { useEffect, useState } from "react";
import { getBikesListener } from "../../../api/bikes";
import { Table, TextField } from "../../../components";
import ReservationIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import FilterListIcon from '@mui/icons-material/FilterListOutlined';
import CancelIcon from '@mui/icons-material/CancelOutlined';
import {
  IconButton, Toolbar, Button, Dialog, DialogActions, Typography, Tooltip,
  DialogContent, DialogContentText, DialogTitle, Grid, InputAdornment
} from '@mui/material';
import { useAuth } from "../../../context/AuthContext";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { cancelReservation, createReservation, getMyReservations } from "../../../api/reservations";
import moment from 'moment';

const dateFormat = 'DD/MM/yyyy';
export const BikeReservation = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <MakeReservation />
      </Grid>
      <Grid item xs={12}>
        <MyReservations />
      </Grid>
    </Grid>
  )
}
const MakeReservation = () => {
  const [rows, setRows] = useState([]);
  const [filters, setFilters] = useState({
    model: '',
    color: '',
    location: '',
    rating: ''
  })
  const [from, setFrom] = useState(moment.now())
  const [to, setTo] = useState(moment.now())
  const onChangeFilter = (obj) => {
    setFilters(data => ({
      ...data,
      ...obj
    }))
  }
  const [filterDialog, setFilterDialog] = useState(false);
  const [reserveDialog, setReserveDialog] = useState(false);
  const columns = [
    { id: 'model', label: 'Model', align: 'center', minWidth: 170 },
    { id: 'color', label: 'Color', align: 'center', minWidth: 100 },
    { id: 'location', label: 'Location', align: 'center', minWidth: 170 },
    { id: 'rating', label: 'Rating', align: 'center', minWidth: 100 },
    { id: 'available', label: 'Available', align: 'center', minWidth: 100 },
    { id: 'actions', label: 'Actions', align: 'center', minWidth: 100 }
  ];
  const onReserve = async (bikeId, uid, data) => {
    await createReservation({ bikeId, uid, ...data });
  }
  const createRows = (rows) => {
    return rows.map(each => {
      return {
        id: each.id,
        model: each.model || '',
        color: each.color || '',
        location: each.location || '',
        rating: each.rating || '',
        available: each.available ? '✓' : '✕',
        actions: <Tooltip title="Reserve">
          <IconButton color="primary" component="span" onClick={() => setReserveDialog(each)}>
            <ReservationIcon />
          </IconButton>
        </Tooltip>
      }
    })
  }
  useEffect(() => {
    getBikesListener({}, data => setRows(createRows(data)));
  }, []);
  const filteredRows = rows.filter((each) => {
    const allfilters = [];
    if (filters.model !== '') {
      allfilters.push(each.model.includes(filters.model));
    }
    if (filters.location !== '') {
      allfilters.push(each.location.includes(filters.location));
    }
    if (filters.color !== '') {
      allfilters.push(each.color.includes(filters.color));
    }
    if (filters.rating !== '') {
      allfilters.push(each.rating.includes(filters.rating));
    }
    return allfilters.reduce((each, i) => (each && i), true);
  })
  const toolbar = (
    <>
      <Toolbar>
        <Typography variant="h7" component="div" >
          Bike Reservation
        </Typography>
        <div style={{ flex: 1 }} />
        <Tooltip title="Filter">
          <IconButton onClick={() => setFilterDialog(true)}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Toolbar>
        <div style={{ flex: 1 }} />
        <DesktopDatePicker
          label="From Date"
          inputFormat={dateFormat}
          value={from}
          onChange={setFrom}
          renderInput={(params) => <TextField margin="dense" style={{ marginRight: 12 }} {...params} />}
        />
        <DesktopDatePicker
          label="To Date"
          inputFormat={dateFormat}
          value={to}
          onChange={setTo}
          renderInput={(params) => <TextField margin="dense" {...params} />}
        />
      </Toolbar>
    </>
  )
  return (
    <>
      <Table columns={columns} rows={filteredRows} toolbar={toolbar} />
      <BikeFilterDialog open={filterDialog} filters={filters} onChangeFilter={onChangeFilter} setOpen={setFilterDialog} />
      <BikeAddReservationDialog onReserve={onReserve} open={reserveDialog} setOpen={setReserveDialog} from={from} to={to} />
    </>
  )
}

const MyReservations = () => {
  const { currentUser } = useAuth()
  const [rows, setRows] = useState([]);
  const [cancelDialog, setCancelDialog] = useState(false);
  const columns = [
    { id: 'model', label: 'Model', align: 'center', minWidth: 170 },
    { id: 'color', label: 'Color', align: 'center', minWidth: 100 },
    { id: 'from', label: 'From', align: 'center', minWidth: 170 },
    { id: 'to', label: 'To', align: 'center', minWidth: 100 },
    { id: 'actions', label: 'Actions', align: 'center', minWidth: 100 }
  ];
  const onCancel = async (id) => {
    console.log('====== IDS: ',currentUser.uid, id)
    await cancelReservation(currentUser.uid, id);
  }
  const createRows = (rows) => {
    console.log('===========', rows)
    return rows.map(each => {
      return {
        id: each.id,
        model: each.model || '',
        color: each.color || '',
        to: each.to || '',
        from: each.from || '',
        location: each.location || '',
        actions: <Tooltip title="Reserve">
          <IconButton color="primary" component="span" onClick={() => setCancelDialog(each)}>
            <CancelIcon />
          </IconButton>
        </Tooltip>
      }
    })
  }
  useEffect(() => {
    getMyReservations(currentUser.uid, data => setRows(createRows(data)));
  }, []);
  const toolbar = (
    <>
      <Toolbar>
        <Typography variant="h7" component="div" >
          My Reservations
        </Typography>
        <div style={{ flex: 1 }} />
      </Toolbar>
    </>
  )
  return (
    <>
      <Table columns={columns} rows={rows} toolbar={toolbar} />
      <BikeCancelReservationDialog onCancel={onCancel} open={cancelDialog} setOpen={setCancelDialog} />
    </>
  )
}

const BikeFilterDialog = (props) => {
  const { open, setOpen, filters, onChangeFilter } = props;
  const [model, setModel] = useState(filters?.model || '')
  const [color, setColor] = useState(filters?.color || '')
  const [location, setLocation] = useState(filters?.location || '')
  const [rating, setRating] = useState(filters?.location || '')
  useEffect(() => {
    setModel(filters?.model);
    setColor(filters?.color);
    setLocation(filters?.location);
    setRating(filters?.rating);
  }, [filters])
  const handleClose = () => {
    setOpen(false);
  };
  const onSave = () => {
    const params = { model, color, location, rating };
    onChangeFilter(params);
    handleClose();
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Filter</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please select filters
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
              InputProps={{
                endAdornment:
                  model && <InputAdornment position="end">
                    <IconButton
                      onClick={() => setModel('')}
                      edge="end"
                    >
                      <CancelIcon />
                    </IconButton>
                  </InputAdornment>
              }}
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
              InputProps={{
                endAdornment:
                  color && <InputAdornment position="end">
                    <IconButton
                      onClick={() => setColor('')}
                      edge="end"
                    >
                      <CancelIcon />
                    </IconButton>
                  </InputAdornment>
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={location}
              onChange={e => setLocation(e.target.value)}
              autoFocus
              id="location"
              label="Location"
              fullWidth
              InputProps={{
                endAdornment:
                  location && <InputAdornment position="end">
                    <IconButton
                      onClick={() => setLocation('')}
                      edge="end"
                    >
                      <CancelIcon />
                    </IconButton>
                  </InputAdornment>
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={rating}
              onChange={e => setRating(e.target.value)}
              autoFocus
              id="rating"
              label="Rating"
              fullWidth
              InputProps={{
                endAdornment:
                  rating && <InputAdornment position="end">
                    <IconButton
                      onClick={() => setRating('')}
                      edge="end"
                    >
                      <CancelIcon />
                    </IconButton>
                  </InputAdornment>
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={onSave}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}

const BikeAddReservationDialog = (props) => {
  const { currentUser } = useAuth();
  const { open, setOpen, onReserve, from, to } = props;
  const handleClose = () => {
    setOpen(false);
  };
  const onSave = () => {
    const params = { to: moment(to).format(dateFormat).toString(), from: moment(from).format(dateFormat).toString() };
    onReserve(open.id, currentUser.uid, params);
    handleClose();
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Reservation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to reverve this bike from {moment(from).format(dateFormat)} to {moment(to).format(dateFormat)}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={onSave}>Reserve</Button>
      </DialogActions>
    </Dialog>
  )
}

const BikeCancelReservationDialog = ({ open, setOpen, onCancel }) => {
  const [error, setError] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleYes = async () => {
    try {
      await onCancel(open.id);
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
      <DialogTitle>Cancel Reservation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to cancel this reservation?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={handleYes}>Yes</Button>
      </DialogActions>
    </Dialog>
  )
}
