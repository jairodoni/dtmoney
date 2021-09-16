import styled from 'styled-components';
import { darken, transparentize } from 'polished';

export const Container = styled.form`
  h2 {
    color: ${props => props.theme.colors.textTitle};
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  input {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    border-radius: 0.25rem;

    background: ${props =>
      props.theme.title === 'light' ? '#e7e9ee' : '#272E45'};

    color: ${props => props.theme.colors.textTitle};

    border: ${props =>
      props.theme.title === 'light' ? `1px solid #d7d7d7` : 'none'};

    font-weight: 400;
    font-size: 1rem;

    &::placeholder {
      color: ${props => props.theme.colors.textBody};
    }
    &:active {
      border: 2px solid ${props => props.theme.colors.blue};
    }
    &:hover {
      border: 1px solid ${props => props.theme.colors.borderInputHover};
    }

    & + input {
      margin-top: 1rem;
    }
    & + div {
      margin-top: 1rem;
      width: 100%;
    }
  }

  button[type='submit'] {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    background: ${props => props.theme.colors.green};
    color: #fff;
    border-radius: 0.25rem;
    border: 0;
    font-size: 1rem;
    margin-top: 1.5rem;
    font-weight: 600;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;

export const TransactionTypeContainer = styled.div`
  margin: 1rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
`;

interface RadioBoxProps {
  isActive: boolean;
  activeColor: 'green' | 'red';
}

const color = {
  red: '#E52E40',
  green: '#33CC95',
};

export const RadioBox = styled.button<RadioBoxProps>`
  height: 4rem;
  border: 1px solid #d7d7d7;
  border-radius: 0.25rem;
  //abaixo so o background fica transparente(mudando a opacity)
  background: ${props =>
    props.isActive
      ? transparentize(0.9, color[props.activeColor])
      : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;

  transition: border-color 0.2s;
  border-color: ${props => darken(0.1, props.theme.colors.borderColor)};
  &:hover {
    border-color: ${darken(0.1, '#d7d7d7')};
  }

  img {
    width: 20px;
    height: 20px;
  }

  span {
    display: inline-block;
    margin-left: 1rem;
    font-size: 1rem;
    color: ${props => props.theme.colors.textTitle};
  }
`;
