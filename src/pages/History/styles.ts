import styled from 'styled-components'

export const HistoryContainer = styled.main`
  flex: 1;

  padding: 3.5rem;

  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme['gray-100']};
    font-weight: bold;
  }
`

export const HistoryList = styled.div`
  flex: 1;

  overflow: auto;
  margin-top: 2rem;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;
  }

  th {
    background-color: ${(props) => props.theme['gray-600']};
    padding: 1rem 1.5rem;
    text-align: left;
    font-size: 0.875rem;
    color: ${(props) => props.theme['gray-100']};
    line-height: 1.6;

    &:first-child {
      border-top-left-radius: 8px;
      padding-left: 1.5rem;
    }
    &:last-child {
      border-top-right-radius: 8px;
      padding-right: 1.5rem;
    }
  }

  td {
    background-color: ${(props) => props.theme['gray-700']};
    border-top: 4px solid ${(props) => props.theme['gray-800']};
    padding: 1rem 1.5rem;
    font-size: 0.875rem;

    &:first-child {
      width: 50%;
    }
  }
`

const STATUS_COLOR = {
  green: 'green-500',
  yellow: 'yellow-500',
  red: 'red-500',
} as const

interface ProjectStatusProps {
  statusColor: keyof typeof STATUS_COLOR
}

export const ProjectStatus = styled.span<ProjectStatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5em;
    border-radius: 9999px;
    background-color: ${(props) =>
      props.theme[STATUS_COLOR[props.statusColor]]};
  }
`
