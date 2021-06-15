import { ReactElement } from "react";
import { Tooltip, Zoom } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

interface TipProps {
  children: ReactElement;
  message: string;
}

export function Tip({ children, message }: TipProps) {
  const classes = useStyles();

  return (
    <Tooltip
      classes={{ tooltip: classes.tip }}
      title={message}
      placement="right"
      arrow
      disableFocusListener
      disableTouchListener
      TransitionComponent={Zoom}
      enterDelay={500}
      leaveDelay={200}
    >
      {children}
    </Tooltip>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    tip: {
      fontSize: 12
    },
  }),
);