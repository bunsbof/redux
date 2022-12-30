import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import { Button, Toolbar } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import Create from "../partials/modals/Create";
import Detail from "../partials/modals/Detail";
import Update from "../partials/modals/Update";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../features/Users";

const useStyles = makeStyles({
  grid: {
    width: "100%",
  },
});

const Employee = () => {
  const users = useSelector((state) => state.userList.users);
  console.log(users)
  const loading = useSelector((state) => state.userList.loading);
  const error = useSelector((state) => state.userList.error);
  const dispatch = useDispatch();

  const [createState, setCreateState] = useState(false);
  const [detailState, setDetailState] = useState(false);
  const [updateState, setUpdateState] = useState(false);

  const classes = useStyles();

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: false,
    },
    {
      field: "address",
      headerName: "Address",
      width: 150,
      editable: false,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      editable: false,
    },
    {
      field: "contact",
      headerName: "Phone Number",
      type: "number",
      width: 200,
      editable: false,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      renderCell: () => {
        return (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setDetailState(true)}
            >
              Details
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => setUpdateState(true)}
            >
              Edit
            </Button>
            <Button variant="contained" color="error">
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Toolbar>
        <Button variant="outlined" onClick={() => setCreateState(true)}>
          Create
        </Button>
      </Toolbar>
      {createState && (
        <Create open={createState} onClose={() => setCreateState(false)} />
      )}

      {detailState && (
        <Detail open={detailState} onClose={() => setDetailState(false)} />
      )}

      {updateState && (
        <Update open={updateState} onClose={() => setUpdateState(false)} />
      )}

      <DataGrid
        className={classes.grid}
        rows={users}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default Employee;
