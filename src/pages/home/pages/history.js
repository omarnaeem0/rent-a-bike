import { Grid, FormControl, InputLabel, Select, MenuItem, Card, CardContent, Button, Rating } from "@mui/material";
import React, { useState } from "react";
import { getAccount, getAccounts } from "../../../api/accounts";
import { getBike, getBikes } from "../../../api/bikes";
import { TableList, TextField, Table } from "../../../components";

export const History = () => {
  const [searchType, setSearchType] = useState('');
  const onChangeSearchType = (e) => {
    setSearchType(e.target.value);
    onClearFields();
    onClearSearch();
    setSelectedBike();
    setSelectedUser();
  }
  const onClearFields = () => {
    setModel('');
    setColor('');
    setLocation('');
    setEmail('');
    setName('');
  }
  const onClearSearch = () => {
    setBikes([]);
    setUsers([]);
  }
  const addRatingComponent = (rows) => {
    return rows.map(each => {
      return {
        ...each,
        rating: <Rating value={each.rating || 0} readOnly/>
      }
    })
  }
  // bikes
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [location, setLocation] = useState('');
  const [selectedBike, setSelectedBike] = useState();
  const [bikes, setBikes] = useState([]);
  const bikesColumns = [
    { id: 'model', label: 'Model', align: 'center', minWidth: 170 },
    { id: 'color', label: 'Color', align: 'center', minWidth: 100 },
    { id: 'location', label: 'Location', align: 'center', minWidth: 170 },
  ];
  const onSearchBike = async () => {
    const bikes = await getBikes({ model, color, location }, [])
    setBikes(bikes);
  }
  const onSelectBike = async (data) => {
    setSelectedUser(undefined);
    let usersReservations = data?.usersReservations || {}
    for (let user in usersReservations) {
      const remainingData = await getAccount(user);
      data.usersReservations[user] = { ...data.usersReservations[user], ...remainingData }
    }
    setSelectedBike(data);
    onClearSearch();
  }
  const bikeHistoryColumns = [
    { id: 'email', label: 'User Email', align: 'center', minWidth: 100 },
    { id: 'name', label: 'User Name', align: 'center', minWidth: 100 },
    { id: 'rating', label: 'User Rating', align: 'center', minWidth: 100 },
    { id: 'from', label: 'From Date', align: 'center', minWidth: 100 },
    { id: 'to', label: 'To Date', align: 'center', minWidth: 100 }
  ];
  const bikeHistoryRows = addRatingComponent(selectedBike?.usersReservations ? Object.values(selectedBike.usersReservations): []);

  // users
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [selectedUser, setSelectedUser] = useState({});
  const [users, setUsers] = useState([]);
  const usersColumns = [
    { id: 'name', label: 'Name', align: 'center', minWidth: 170 },
    { id: 'email', label: 'Email', align: 'center', minWidth: 170 }
  ];
  const onSearchUser = async () => {
    const users = await getAccounts({ name, email, role: 'user' }, ['role'])
    setUsers(users);
  }
  const onSelectUser = async (data) => {
    setSelectedBike(undefined);
    let bikesReservation = data?.bikesReservations || {}
    for (let bike in bikesReservation) {
      const remainingData = await getBike(bike);
      data.bikesReservations[bike] = { ...data.bikesReservations[bike], ...remainingData }
    }
    setSelectedUser(data);
    onClearSearch();
  }
  const userHistoryColumns = [
    { id: 'model', label: 'Bike Model', align: 'center', minWidth: 100 },
    { id: 'color', label: 'Bike Color', align: 'center', minWidth: 100 },
    { id: 'location', label: 'Bike Location', align: 'center', minWidth: 100 },
    { id: 'rating', label: 'User Rating', align: 'center', minWidth: 100 },
    { id: 'from', label: 'From Date', align: 'center', minWidth: 100 },
    { id: 'to', label: 'To Date', align: 'center', minWidth: 100 }
  ];
  const userHistoryRows = addRatingComponent(selectedUser?.bikesReservations ? Object.values(selectedUser.bikesReservations): []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card expanded={searchType}>
          <CardContent>
            <FormControl fullWidth size="small" >
              <InputLabel>Search By</InputLabel>
              <Select
                value={searchType}
                label="Search By"
                onChange={onChangeSearchType}
              >
                <MenuItem value={'bike'}>Search by Bike</MenuItem>
                <MenuItem value={'user'}>Search by User</MenuItem>
              </Select>
            </FormControl>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        {
          searchType &&
          <Card expanded={searchType}>
            <CardContent>
              {
                (searchType === 'bike' &&
                  <Grid container spacing={1}>
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
                        margin="dense"
                        id="location"
                        label="Location"
                        fullWidth
                      />
                    </Grid>
                  </Grid>) || (searchType === 'user' &&
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <TextField
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          autoFocus
                          margin="dense"
                          id="email"
                          label="Email"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
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
                    </Grid>
                )
              }
              <div style={{ display: 'flex', marginTop: 12 }}>
                <Button fullWidth variant="outlined" onClick={onClearFields}>Clear</Button>
                <div style={{ width: 20 }} />
                <Button fullWidth variant="contained" onClick={searchType === 'bike' ? onSearchBike : onSearchUser}>Search</Button>
              </div>
              {
                searchType && (
                  searchType === 'bike' ?
                    (bikes.length > 0 && <TableList title={'Select the bike you want to view'} onSelectRecord={onSelectBike} columns={bikesColumns} rows={bikes} />) :
                    (users.length > 0 && <TableList title={'Select the user you want to view'} onSelectRecord={onSelectUser} columns={usersColumns} rows={users} />)
                )
              }

            </CardContent>
          </Card>
        }
      </Grid>
      <Grid item xs={12}>
        {
          selectedBike && selectedBike.usersReservations &&
          <Table columns={bikeHistoryColumns} rows={bikeHistoryRows} />
        }
        {
          selectedUser && selectedUser.bikesReservations &&
          <Table columns={userHistoryColumns} rows={userHistoryRows} />
        }
      </Grid>
    </Grid>
  )
}
