import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from '../components/TransactionsTable/styles';
import styled from 'styled-components';
export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.textBody};
    -webkit-font-smoothing: antialiased;
  }
  
  // font-size: 16px (Desktop)
  // REM = 1rem = 16px
  html {
    @media (min-width: 1080px) {
      font-size: 93.75%; //15px
    }

    @media (min-width: 720px) {
      font-size: 87.5%; //14px
    }
  }

  body, input, textarea, button, label {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
  }
  
  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
  }

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .react-modal-overlay {
    background: rgba(0, 0, 0, 0.5);

    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;
  }
  .react-modal-content {
    background: ${props => props.theme.colors.background};
    width: 100%;
    max-width: 576px;
    padding: 3rem;
    position: relative;
    border-radius: 0.24rem;
  }
  .react-modal-close {
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    border: 0;
    background: transparent;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.8);
    }
  }
  
  .data {
   background: "#000";
   color: "#fff";
  }

  /* width */
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    background: #1A1E2E;
  }
  /* Handle */
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    opacity: 0.4;
    background:#3D466B;
  }

  .transaction-table {
    /* th {
      color: ${props => props.theme.colors.textBody};
    } */
    .body-table td {
      background: ${props => props.theme.colors.shape};
      color: ${props => props.theme.colors.textBody};

      svg {
        background: ${props => props.theme.colors.shape};
        transition: filter 0.2s;

        &:hover {
          filter: brightness(0.85);
        }
        &.edit {
            color: ${props => props.theme.colors.buttons};
          }
        &.delete {
          color: ${props => props.theme.colors.red};
        }
      }

      &:first-child {
        color: ${props => props.theme.colors.textTitle};
      }   

      &.deposit {
        color: ${props => props.theme.colors.green};
      }

      &.withdraw {
        color: ${props => props.theme.colors.red};
      }
    }

  }
  .summary {
    background: ${props => props.theme.colors.shape};
    color: ${props => props.theme.colors.textTitle};
  }

  .inputSearch {
    background: ${props => props.theme.colors.shape};
    color: ${props => props.theme.colors.shape02};
  }
  .input-search {
    background: ${props => props.theme.colors.shape};
    color: ${props => props.theme.colors.textTitle};
    input{
      background: ${props => props.theme.colors.shape};
      color: ${props => props.theme.colors.textTitle};

      border: ${props =>
        props.theme.title === 'light' ? `1px solid #d7d7d7` : 'none'};
        
      border: none;
      &::placeholder {
        color: ${props => props.theme.colors.textBody};
        filter: brightness(0.8);
      }
    }
    button {
      color: ${props => props.theme.colors.textTitle};

      transition: filter 0.2s;

      &:hover { 
        filter: brightness(0.7)
      }
    }
  }
  
  .popover {
    button{
      background: ${props => props.theme.colors.popover};
      color: ${props => props.theme.colors.shape02};

      a{
        background: none;
        color: ${props => props.theme.colors.shape02};
      }
      a:active{
        color: ${props => props.theme.colors.shape02};
      }

      transition: background 0.2s;

      &:hover{
        background: ${props => props.theme.colors.hover};
      }
    }
  }
`;
