import styled from 'styled-components';
import { PopoverContainer } from '../InputSearch/styles';

export const Container = styled.header`
  background: ${props => props.theme.colors.blue};
`;

export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;

  padding: 1.2rem 1rem 10rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  div {
    display: inline;

    button:last-child {
      font-size: 1rem;
      color: #fff;
      background: ${props => props.theme.colors.blueLight};
      border: 0;
      padding: 0 2rem;
      border-radius: 0.25rem;
      height: 3rem;

      position: relative;
      float: right;

      transition: filter 0.2s;

      &:hover {
        filter: brightness(0.9);
      }
    }
  }
`;

export const Perfil = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  button {
    background: ${props => props.theme.colors.blueLight02};
    border: 0;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.8);
    }

    font-size: 0;
    width: 4rem;
    height: 2.4rem;
    border-radius: 0.5rem;

    margin-left: auto;
    margin-right: 1rem;
  }
  @media (max-width: 500px) {
    & {
      width: 0;
      height: 0;
      padding: 0;
    }
  }
  div.imgPerfil {
    background: ${props => props.theme.colors.blue};
    img {
      width: 3.2rem;
      height: 3.2rem;
      border-radius: 50%;
    }
  }
  div.divider {
    height: 2.5rem;
    width: 1px;
    background: ${props => props.theme.colors.white};
    margin: 0 1rem;
  }
  div.infoPerfil {
    text-align: right;
    max-width: 300px;
    width: 100%;
    display: block;
    color: ${props => props.theme.colors.white};
  }
`;

export const AvatarStyled = styled.div`
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-right: 2px;

  img {
    border-radius: 50%;
    height: 40px;
    width: 40px;
    object-fit: cover;
  }

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.7);
  }
`;
