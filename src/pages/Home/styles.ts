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

  @media (max-width: 796px) {
    gap: 2rem;
  }
`

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
`

const BaseCountdownButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  color: ${(props) => props.theme['gray-100']};
  font-weight: bold;
  border-radius: 8px;
  border: none;
  padding: 1.25rem 0;
  cursor: pointer;

  @media (max-width: 796px) {
    max-width: 300px;
  }
`

export const StartCountdownButton = styled(BaseCountdownButton)`
  background-color: ${(props) => props.theme['green-500']};

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme['green-700']};
  }
`

export const StopCountdownButton = styled(BaseCountdownButton)`
  background-color: ${(props) => props.theme['red-500']};

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme['red-700']};
  }
`

export const PauseCountdownButton = styled(BaseCountdownButton)`
  background-color: ${(props) => props.theme['yellow-500']};

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme['yellow-700']};
  }
`

export const ResumeCountdownButton = styled(BaseCountdownButton)`
  background-color: ${(props) => props.theme['blue-500']};

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme['blue-700']};
  }
`
