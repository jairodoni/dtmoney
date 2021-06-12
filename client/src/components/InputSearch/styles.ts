import styled from 'styled-components';

export const InputSearch = styled.div`
  -webkit-box-shadow: 0px 3px 2px -2px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 3px 2px -2px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 3px 2px -2px rgba(0, 0, 0, 0.5);

  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  /* border: 2px solid red; */
  input {
    border: none;
    width: 100%;
    padding: 0 1rem;
    height: 3.5rem;
    border-radius: 5px;

    font-weight: 400;
    font-size: 1rem;

    & + input {
      margin-top: 1rem;
    }
  }

  button {
    display: flex;
    padding: 10px;
    font-size: 1rem;
    border: none;
    background: none;
  }
  .icon {
    margin: 0 15px;
  }
  .divider {
    height: 28px;
    width: 1px;
    background: #7d8c9e;
    margin-right: 5px;
  }
`;

export const PopoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100px;
  border-radius: 4px;
  /* border: 2px solid red; */
  button {
    text-align: left;
    border: none;
    padding: 0.8rem 0.8rem 0.8rem 1rem;
    width: 100%;
  }
`;
