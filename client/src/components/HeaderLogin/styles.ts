import styled from 'styled-components';

export const Header = styled.header`
  background: ${props => props.theme.colors.blue};
`;

export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;

  padding: 1.2rem 1rem 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    max-width: 1120px;
  }
`;
