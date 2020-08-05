import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography, colors } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  },
  textH4: {
    color: colors.blueGrey[900],
    fontWeight: 500,
    fontSize: '20px',
    letterSpacing: '-0.06px',
    lineHeight: '24px'
  },
}));

const Profile = props => {
  const { className, currentUser, ...rest } = props;

  const classes = useStyles();
  console.log(currentUser);

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={'/user.png'}
        to="/settings"
      />
      <Typography
        className={classes.name, classes.textH4}
        variant="h4"
      >
        {`${currentUser.firstName} ${currentUser.lastName}`}
      </Typography>
      <Typography variant="body2">{currentUser.email}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
