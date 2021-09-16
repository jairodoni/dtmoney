import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;

  img {
    display: flex;
    margin: 0 auto;
    width: 300px;
  }

  .size {
    width: 100%;
    max-width: 900px;
  }

  .game {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 400px;
    max-width: 900px;
    margin-bottom: 5%;

    border-radius: 12px;
    border: 4px solid rgb(76, 62, 139);
  }
`;
