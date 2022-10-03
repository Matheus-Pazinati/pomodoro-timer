import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  a {
    width: 3rem;
    height: 3rem;
    color: ${(props) => props.theme['gray-100']};
    display: flex;
    align-items: center;
    justify-content: center;

    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;

    &:hover {
      border-bottom-color: ${(props) => props.theme['green-500']};
    }

    &.active {
      color: ${(props) => props.theme['green-500']};
      box-shadow: none;
    }
    &:focus {
      box-shadow: none;
    }
  }
`