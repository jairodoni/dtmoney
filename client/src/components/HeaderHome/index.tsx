
import React from 'react';
import { Avatar, Box, Button, createStyles, makeStyles, Menu, MenuItem, Popover, Theme, Typography } from '@material-ui/core';
import { useState } from 'react';
import { IoSunny } from 'react-icons/io5';
import { GoSignOut } from 'react-icons/go';
import { RiMoonClearFill } from 'react-icons/ri';
import { Container, Content, Perfil } from './styles';
import { signOut } from "next-auth/client";
import Cookies from 'js-cookie';

interface User {
  user: {
    email: string;
    image: string;
    name: string;
  }
}

interface HeaderProps {
  onOpenNewTransactionsModal: () => void;
  handleDarkMode: () => void;
  darkMode: boolean;
  session: User;
}

export function Header({ onOpenNewTransactionsModal, handleDarkMode, darkMode, session }: HeaderProps) {
  const [options, setOptions] = useState<null | HTMLElement>(null);
  const classes = useStyles();

  function handleOpenOptions(event: React.MouseEvent<HTMLButtonElement>) {
    setOptions(event.currentTarget);
  }

  function handleCloseOptions() {
    setOptions(null);
  }

  const open = Boolean(options);
  const id = open ? 'simple-popover' : undefined;


  return (
    <Container>
      <Content>
        <img src="/images/logo02.svg" alt="dt money" />

        <div>
          <Perfil>

            <button onClick={handleDarkMode}>
              {darkMode
                ? <IoSunny size={21} color="#fff" />
                : <RiMoonClearFill size={18} color="#fff" />
              }

            </button>
            <div
              className="infoPerfil"
              aria-controls="simple-menu"
              aria-haspopup="true"
            >
              <strong>{session.user.name}</strong>
              <br />
              <span>{session.user.email}</span>
            </div>
            <div className="divider" />
            <Avatar
              alt={session.user.name}
              src={session.user.image}
              onClick={handleOpenOptions}
            />
          </Perfil>

          <Popover
            classes={{
              paper: darkMode ? classes.paperDark : classes.paperLight,
            }}
            id={id}
            open={open}
            anchorEl={options}
            onClose={handleCloseOptions}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Box className={classes.box} onClick={(): Promise<void> => signOut()}>
              <GoSignOut size={21} />
              <Typography className={classes.typography}>Logout</Typography>
            </Box>
          </Popover>

          <button type="button" onClick={onOpenNewTransactionsModal}>
            Nova transação
        </button>
        </div>
      </Content>
    </Container >
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paperLight: {
      background: "#eee",
      color: "#585858",
    },
    paperDark: {
      background: "#272E45",
      color: "#ddd",
    },
    typography: {
      fontFamily: "Poppins",
      padding: theme.spacing(1.5),
    },
    box: {
      display: "flex",
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: "10px",



      transition: "background 0.2s",

      '&:hover': {
        background: "#bbb"
      }
    }
  }),
);