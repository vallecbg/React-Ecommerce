import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import userService from '../../../Services/userService'

import { UsersTable } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.getAll().then(({ data: currUsers }) => {
      setUsers(currUsers);
    });
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <UsersTable users={users} />
      </div>
    </div>
  );
};

export default UserList;
