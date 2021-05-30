import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Paper, InputBase, Divider, IconButton, Menu, Button, MenuItem } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: "#272E45",
      width: "100%",
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
    },
    input: {
      fontFamily: "Poppins",
      color: "#fff",
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      color: "#ddd",
      padding: 10,
    },
    divider: {
      background: "#ababab",
      height: 28,
      margin: 4,
    },
    menu: {
      // background: '#363F5E',
      marginRight: "15px"

    }
  }),
);

export function InputButton() {
  const [options, setOptions] = useState<null | HTMLElement>(null);

  const classes = useStyles();

  function handleOpenOptions(event: React.MouseEvent<HTMLButtonElement>) {
    setOptions(event.currentTarget);
  }

  function handleCloseOptions() {
    setOptions(null);
  }



  return (
    <Paper component="form" className={classes.root}>

      <InputBase
        className={classes.input}
        placeholder="Buscar por referencia..."
        inputProps={{ 'aria-label': 'buscar por referencia...' }}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />

      <IconButton
        color="primary"
        className={classes.iconButton}
        aria-label="directions"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleOpenOptions}
      >
        <KeyboardArrowDownIcon />
      </IconButton>

      <Menu
        id="simple-menu"
        anchorEl={options}
        keepMounted
        open={Boolean(options)}
        onClose={handleCloseOptions}
      >

        <MenuItem onClick={handleCloseOptions}>Todos os items</MenuItem>
        <MenuItem onClick={handleCloseOptions}>Lucros</MenuItem>
        <MenuItem onClick={handleCloseOptions}>Investimentos</MenuItem>
      </Menu>
    </Paper>
  );
}