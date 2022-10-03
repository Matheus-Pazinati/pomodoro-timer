import styled from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const StyleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
`

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  color: ${(props) => props.theme['gray-100']};
  font-weight: bold;
  font-size: 1.125rem;
  flex-wrap: wrap;
`

const FormInputBase = styled.input`
  background-color: transparent;
  padding: 0.5rem 0.75rem;
  margin-top: 0.25rem;
  color: ${(props) => props.theme['gray-100']};
  border: none;
  border-bottom: 2px solid ${(props) => props.theme['gray-500']};

  &::placeholder {
    color: ${(props) => props.theme['gray-500']};
    font-weight: bold;
  }

  &:focus {
    box-shadow: none;
    border-bottom-color: ${(props) => props.theme['green-500']};
  }
`

export const ProjectInput = styled(FormInputBase)`
  flex: 1;
`

export const ProjectMinutes = styled(FormInputBase)`
  width: 4.5rem;
`

export const CountdownContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  span {
    font-size: 10rem;
    font-family: 'Roboto Mono', monospace;
    line-height: 7.5rem;
    background-color: ${(props) => props.theme['gray-700']};
    padding: 2.5rem 1rem;
    border-radius: 8px;
  }
`

export const CountdownSeparator = styled.div`
  font-size: 10rem;
  background-color: transparent;
  color: ${(props) => props.theme['green-500']};
  font-weight: bold;
`

export const StartCountdownButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  background-color: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme['gray-100']};
  font-weight: bold;
  border-radius: 8px;
  border: none;
  padding: 1.25rem 0;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme['green-700']};
  }
`
