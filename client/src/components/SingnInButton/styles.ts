import styled from 'styled-components';

export const SingnIn = styled.button`
  width: 7rem;
  font-size: 1rem;
  color: #fff;
  background: ${props => props.theme.colors.blueLight};
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
`;
export const SingnOut = styled.button`
  width: 7rem;
  font-size: 1rem;
  color: #fff;
  background: ${props => props.theme.colors.blueLight};
  border: 0;
  padding: 0 1rem;
  border-radius: 3rem;
  height: 3rem;

  display: flex;
  justify-content: space-around;
  align-items: center;
  transition: filter 0.2s;
  img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
  }

  &:hover {
    filter: brightness(0.9);
  }
`;
