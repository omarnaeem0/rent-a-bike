import { Grid, FormControl, InputLabel, Select, MenuItem, Card, CardContent, Accordion, AccordionSummary, AccordionDetails, Button } from "@mui/material";
import React, { useState } from "react";
import { TableList, TextField } from "../../../components";

export const History = (props) => {
  const [searchType, setSearchType] = useState('');
  const onChangeSearchType = (e) => {
    setSearchType(e.target.value);
    setModel('');
    setColor('');
    setLocation('');
    setEmail('');
    setName('');
    setBikes([]);
    setUsers([]);
  }
  // bikes
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [location, setLocation] = useState('');

  const [bikes, setBikes] = useState([]);
  const bikesColumns = [
    { id: 'model', label: 'Model', align: 'center', minWidth: 170 },
    { id: 'color', label: 'Color', align: 'center', minWidth: 100 },
    { id: 'location', label: 'Location', align: 'center', minWidth: 170 },
    { id: 'rating', label: 'Rating', align: 'center', minWidth: 100 }
  ];
  const onSearchBike = () => {
    console.log('============ onSearchBike')
  }
  const onSelectBike = (data) => {
    console.log('============ onSelectBike: ', data);
  }
  
  // users
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  
  const [users, setUsers] = useState([]);
  const usersColumns = [
    { id: 'name', label: 'Name', align: 'center', minWidth: 170 },
    { id: 'email', label: 'Email', align: 'center', minWidth: 170 }
  ];
  const onSearchUser = () => {
    console.log('============ onSearchUser')
    setUsers([{ name: 'User 1', email: 'user1@live.com', id: '123' }])
  }
  const onSelectUser = (data) => {
    console.log('============ onSelectBike: ', data);
  }
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
              <div style={{ display: 'flex', marginTop: 12, marginBottom: 20 }}>
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
    </Grid>
  )
}
