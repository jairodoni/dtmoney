import styled, { DefaultTheme } from 'styled-components';

interface ContainerProps {
  theme: DefaultTheme;
}

export const Container = styled.div<ContainerProps>`
  margin-top: 4rem;

  table {
    width: 100%;
    border-spacing: 0 0.5rem;

    th {
      font-weight: 400;
      padding: 1rem 2rem;
      text-align: left;
      line-height: 1.5rem;
    }

    .body-table td {
      padding: 0.5rem 2rem;
      border: 0;

      svg {
        width: 2rem;
        height: 2rem;
        padding: 4px;
        border-radius: 4px;
      }

      &:first-child {
        border-radius: 0.25rem 0 0 0.25rem;
      }
      &:last-child {
        border-radius: 0 0.25rem 0.25rem 0;
      }
    }
  }

  .loading {
    margin-top: 5rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
