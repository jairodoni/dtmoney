import styled from 'styled-components';
import { PopoverContainer } from '../InputSearch/styles';

export const PopoverStyled = styled(PopoverContainer)`
  width: 150px;
  button {
    width: 150px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    svg {
      margin-right: 10px;
    }

    span {
      align-items: center;
      justify-content: center;
      text-align: center;
    }
  }
`;
