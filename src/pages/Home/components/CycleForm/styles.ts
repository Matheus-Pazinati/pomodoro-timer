import styled from 'styled-components'

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

  @media (max-width: 796px) {
    font-size: 0.875rem;
    flex-direction: column;
  }

  .TaskContainer {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
`

const FormInputBase = styled.input`
  background-color: transparent;
  padding: 0.5rem 0.75rem;
  margin-top: 0.25rem;
  color: ${(props) => props.theme['gray-100']};
  border: none;
  border-bottom: 2px solid ${(props) => props.theme['gray-500']};

  @media (max-width: 796px) {
    padding: 0.5rem;
  }

  &::placeholder {
    color: ${(props) => props.theme['gray-500']};
    font-weight: bold;

    @media (max-width: 796px) {
      font-size: 0.75rem;
    }
  }

  &:focus {
    box-shadow: none;
    border-bottom-color: ${(props) => props.theme['green-500']};
  }
`

export const ProjectInput = styled(FormInputBase)`
  flex: 1;

  @media (max-width: 796px) {
    flex: 0;
  }

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

export const ProjectMinutes = styled(FormInputBase)`
  width: 4rem;

  @media (max-width: 796px) {
    width: 2rem;
  }
`
