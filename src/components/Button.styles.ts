import styled, { css } from 'styled-components';

export type ButtonColors = 'primary' | 'secondary' | 'danger' | 'success';

interface ButtonContainerProps {
  variant: ButtonColors;
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;
  margin-left: 10px;
  color: ${props => props.theme.white};
  background-color: ${props => props.theme['green-500']};
`