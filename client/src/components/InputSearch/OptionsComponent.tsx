import { Popover } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { PopoverContainer } from './styles';

interface PopoverComponentProps {
  options: null | HTMLElement;
  setOptions: (options: null | HTMLElement) => void;
  setTypeTransaction: (typeTransaction: string) => void;
}

export function OptionsComponent({
  options,
  setOptions,
  setTypeTransaction,
}: PopoverComponentProps) {
  const classes = useStyles();

  function handleCloseOptions(type: string) {
    if (type !== null) {
      setTypeTransaction(type);
    }
    setOptions(null);
  }

  const open = Boolean(options);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Popover
      classes={{
        paper: classes.paper,
      }}
      id={id}
      open={open}
      anchorEl={options}
      onClose={() => handleCloseOptions(null)}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <PopoverContainer className="popover">
        <button onClick={() => handleCloseOptions('Todos')}>Todos</button>
        <button
          style={{ color: '#33CC95' }}
          onClick={() => handleCloseOptions('Entradas')}
        >
          Entradas
        </button>
        <button
          style={{ color: '#E52E40' }}
          onClick={() => handleCloseOptions('Saidas')}
        >
          Saidas
        </button>
      </PopoverContainer>
    </Popover>
  );
}

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      background: 'none',
    },
  })
);
