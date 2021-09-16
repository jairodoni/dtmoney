import { ReactNode } from 'react';
import { Popover } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core';
import { PopoverStyled } from './styles';

interface PopoverComponentProps {
  children: ReactNode;
  options: null | HTMLElement;
  setOptions: (options: null | HTMLElement) => void;
}

export function PopoverComponent({
  children,
  options,
  setOptions,
}: PopoverComponentProps) {
  const classes = useStyles();

  function handleCloseOptions() {
    setOptions(null);
  }

  const open = Boolean(options);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Popover
      classes={{
        paper: classes.popover,
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
      <PopoverStyled className="popover">{children}</PopoverStyled>
    </Popover>
  );
}
const useStyles = makeStyles(() =>
  createStyles({
    popover: {
      background: 'none',
    },
  })
);
