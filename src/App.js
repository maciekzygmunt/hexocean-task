import styled from 'styled-components';
import Form from './components/Form';

function App() {
  return (
    <>
      <Wrapper>
        <Title>Add dish</Title>
        <Form />
      </Wrapper>
      <Author href="https://github.com/maciekzygmunt" target="_blank">
        Made by Maciej Zygmunt
      </Author>
    </>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 95vh;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const Author = styled.a`
  display: flex;
  justify-content: center;
  text-decoration: none;
  color: black;
  font-weight: 500;
  transition: all 150ms ease-out;
  &:hover,
  &:active {
    transform: scale(0.98);
  }
`;
