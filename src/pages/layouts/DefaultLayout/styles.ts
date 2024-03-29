import styled from 'styled-components'

export const LayoutContainer = styled.div`
  max-width: 74rem;
  height: calc(100vh - 7rem);
  margin: 3.5rem auto;
  padding: 2.5rem;
  border-radius: 8px;

  background-color: ${(props) => props.theme['gray-800']};

  display: flex;
  flex-direction: column;

  @media (max-width: 796px) {
    max-width: 600px;
    padding: 1rem;
  }
`
