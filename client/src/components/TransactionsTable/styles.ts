import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 4rem;

  table {
    width: 100%;
    border-spacing: 0 0.5rem;

    th {
      color: ${theme => theme.theme.colors.textBody};
      font-weight: 400;
      padding: 1rem 2rem;
      text-align: left;
      line-height: 1.5rem;
    }

    td {
      padding: 0.5rem 2rem;
      border: 0;
      background: ${props => props.theme.colors.shape};
      color: ${props => props.theme.colors.textBody};
      /* border:2px solid black; */

      svg {
        background: ${props => props.theme.colors.shape};
        width: 2rem;
        height: 2rem;
        padding: 4px;
        border-radius: 4px;

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
        border-radius: 0.25rem 0 0 0.25rem;
      }
      &:last-child {
        border-radius: 0 0.25rem 0.25rem 0;
      }

      &.deposit {
        color: ${props => props.theme.colors.green};
      }

      &.withdraw {
        color: ${props => props.theme.colors.red};
      }
    }
  }
`;
