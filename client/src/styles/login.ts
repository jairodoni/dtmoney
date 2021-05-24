import styled from "styled-components";

export const Container = styled.header`
  max-width: 100vw;
  margin: 0 auto;
  color: #fff;

  div:first-child {
    max-width: 100%;
    width: 100%;
    height: 450px;
    padding: 3rem;

    background-image: url("background01.png");
    background-size: cover;
    background-repeat: no-repeat;

    margin: auto;
    h2 {
      margin-bottom: 1rem;
    }
    p {
      font-size: 1.1rem;
    }
    & > div {
      max-width: 800px;
      max-height: 300px;
      border-radius: 1rem;
      background: var(--blue-light);
    }
  }

  section:last-child {
    height: 600px;
    background-image: url("https://images.unsplash.com/photo-1572978373428-ec8ed86dcba6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80");
    background-size: cover;
    background-repeat: no-repeat;

    -webkit-box-shadow: -1px -5px 17px 0px rgba(50, 50, 50, 0.77);
    -moz-box-shadow: -1px -5px 17px 0px rgba(50, 50, 50, 0.77);
    box-shadow: -1px -5px 17px 0px rgba(50, 50, 50, 0.77);
    div {
      max-width: 1120px;
      background: blue;
      padding: 15rem 1rem 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: none;
    }
  }
`;
