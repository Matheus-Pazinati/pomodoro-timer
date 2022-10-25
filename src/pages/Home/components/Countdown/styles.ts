import styled from 'styled-components'

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
