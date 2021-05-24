import styled from "styled-components";

export const Header = styled.header`
  background: var(--blue);
`;

export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;

  padding: 1.5rem 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    width: 7rem;
    font-size: 1rem;
    color: #fff;
    background: var(--blue-light);
    border: 0;
    padding: 0 1rem;
    border-radius: 3rem;
    height: 3rem;

    display: flex;
    justify-content: space-around;
    align-items: center;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }
  img {
    max-width: 1120px;
  }
`;
