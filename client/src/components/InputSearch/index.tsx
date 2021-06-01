import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Paper, InputBase, Divider, IconButton, Menu, Button, MenuItem, Popover, Box, Typography } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import Cookies from 'js-cookie';
import { LocalConvenienceStoreOutlined } from '@material-ui/icons';

interface DarkMode {
  darkMode: boolean;
}

export function InputButton({ darkMode }: DarkMode) {
  const [options, setOptions] = useState<null | HTMLElement>(null);
  const [typeTransaction, setTypeTransaction] = useState("Todas")
  const classes = useStyles();

  function handleOpenOptions(event: React.MouseEvent<HTMLButtonElement>) {
    setOptions(event.currentTarget);
  }


  function handleCloseOptions(type: string) {
    if (type) {
      setTypeTransaction(type)
    }
    setOptions(null);
  }
  const inputTheme = darkMode ? classes.dark : classes.light;
  const selectTheme = darkMode ? classes.iconButtonHoverDark : classes.iconButtonHoverLight;

  const open = Boolean(options);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Paper component="form" className={`${classes.root} ${inputTheme}`}>

      <InputBase
        className={`${classes.input} ${inputTheme}`}
        placeholder="Buscar por referencia..."
        inputProps={{ 'aria-label': 'buscar por referencia...' }}
      />
      <IconButton type="submit" aria-label="search" className={`${inputTheme}`}>
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />

      <IconButton
        className={`${classes.buttonType} ${inputTheme}`}
        aria-label="directions"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleOpenOptions}
      >
        {typeTransaction}
        <KeyboardArrowDownIcon />
      </IconButton>


      <Popover
        classes={{
          paper: `${classes.paper} ${inputTheme}`,
        }}
        id={id}
        open={open}
        anchorEl={options}
        onClose={() => handleCloseOptions(typeTransaction)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >


        <IconButton
          className={`${classes.iconButton} ${selectTheme}`}
          onClick={() => handleCloseOptions("Todas")}
        >
          <Typography className={classes.typography}>Todas</Typography>
        </IconButton>
        <IconButton
          style={{
            color: "#33CC95"
          }}
          className={`${classes.iconButton} ${selectTheme}`}
          onClick={() => handleCloseOptions("Entradas")}
        >
          <Typography className={classes.typography}>Entradas</Typography>
        </IconButton>
        <IconButton
          style={{
            color: "#E52E40"
          }}
          className={`${classes.iconButton} ${selectTheme}`}
          onClick={() => handleCloseOptions("Saidas")}
        >
          <Typography className={classes.typography}>Saidas</Typography>
        </IconButton>

      </Popover>
    </Paper>
  );
}



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      fontFamily: "Poppins",
      width: "100%",
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
    },
    input: {
      fontFamily: "Poppins",
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    divider: {
      background: '#7D8C9E',
      height: 28,
      margin: 4,
    },
    typography: {
      fontFamily: "Poppins",
      fontSize: 15,
    },
    paper: {
      transition: "background 0.2s",
      display: "flex",
      flexDirection: "column",
    },
    light: {
      background: "#fff",
      color: "#363F5E"
    },
    dark: {
      background: "#272E45",
      color: '#D6DEFF',
    },
    buttonType: {
      borderRadius: 0,
      padding: 10,
      fontSize: 14,
    },
    iconButton: {
      width: "100px",
      padding: 9,
      justifyContent: "flex-start",
      borderRadius: 0,
      fontSize: 14,
      textAlign: "right",
    },
    iconButtonHoverLight: {
      background: "#fff",
      color: "#363F5E",
      '&:hover': {
        background: '#eee',
      }
    },
    iconButtonHoverDark: {
      background: "#363F5E",
      color: '#D6DEFF',
      '&:hover': {
        background: '#434F75',
      }
    },

  }),
);

{/* 
      <div className={classes.menu}>
        <Menu
          id="simple-menu"
          anchorEl={options}
          keepMounted
          open={Boolean(options)}
          onClose={handleCloseOptions}

        >

          <MenuItem onClick={() => handleCloseOptions("Todos")}>Todos</MenuItem>
          <MenuItem onClick={() => handleCloseOptions("Entradas")} style={{ color: '#33CC95' }}>Entradas</MenuItem>
          <MenuItem onClick={() => handleCloseOptions("Saidas")} style={{ color: '#E52E40' }}>Saidas</MenuItem>
        </Menu>
        </div> */}