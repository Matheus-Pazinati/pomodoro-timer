import styled from 'styled-components'

export const CountdownContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  @media (max-width: 796px) {
    gap: 0.5rem;
  }

  span {
    font-size: 10rem;
    font-family: 'Roboto Mono', monospace;
    line-height: 7.5rem;
    background-color: ${(props) => props.theme['gray-700']};
    padding: 2.5rem 1rem;
    border-radius: 8px;

    @media (max-width: 796px) {
      font-size: 4rem;
      line-height: 3rem;
    }
  }
`

export const CountdownSeparator = styled.div`
  font-size: 10rem;
  background-color: transparent;
  color: ${(props) => props.theme['green-500']};
  font-weight: bold;

  @media (max-width: 796px) {
    font-size: 4rem;
  }
`
