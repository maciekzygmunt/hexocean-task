import styled from 'styled-components';
import Form from './components/Form';

function App() {
  return (
    <Wrapper>
      <Title>Add dish</Title>
      <Form />
    </Wrapper>
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
  font-size: 2rem;
  font-weight: 700;
`;
