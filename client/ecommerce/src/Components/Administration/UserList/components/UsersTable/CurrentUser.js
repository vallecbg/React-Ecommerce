import React, { useState } from "react";
import moment from "moment";
import { TableRow, TableCell, Typography, Button } from "@material-ui/core";

import userService from "../../../../../Services/userService";

const CurrentUser = (props) => {
  const { user, classes } = props;

  const [role, setRole] = useState(user.role);

  function setUserRole(currRole) {
    userService
      .setRole(user._id, { role: currRole })
      .then(({ data: currUser }) => {
        console.log("currUser: ", currUser);
        setRole(currRole);
      });
  }

  return (
    <TableRow className={classes.tableRow} hover key={user._id}>
      <TableCell>
        <div className={classes.nameContainer}>
          <Typography variant="body1">
            {user.firstName} {user.lastName}
          </Typography>
        </div>
      </TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.orders.length}</TableCell>
      <TableCell>{role}</TableCell>
      <TableCell>
        {moment(new Date(user.createdOn)).format("DD/MM/YYYY")}
      </TableCell>
      <TableCell>{moment(new Date(user.lastLogin)).fromNow()}</TableCell>
      <TableCell>
        {role === "User" ? (
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => setUserRole("Admin")}
          >
            Make Admin
          </Button>
        ) : (
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => setUserRole("User")}
          >
            Make User
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default CurrentUser;
