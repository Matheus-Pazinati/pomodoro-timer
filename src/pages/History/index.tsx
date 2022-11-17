import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CycleContext'
import { HistoryContainer, HistoryList, ProjectStatus } from './styles'

export function History() {
  const { cycles } = useContext(CyclesContext)
  return (
    <HistoryContainer>
      <pre>{JSON.stringify(cycles, null, 2)}</pre>
      <h1>Meu histórico</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Exemplo de tarefa</td>
              <td>30 minutos</td>
              <td>Há cerca de 20 minutos</td>
              <td>
                <ProjectStatus statusColor="green">Concluído</ProjectStatus>
              </td>
            </tr>
            <tr>
              <td>Exemplo de tarefa</td>
              <td>30 minutos</td>
              <td>Há cerca de 20 minutos</td>
              <td>
                <ProjectStatus statusColor="green">Concluído</ProjectStatus>
              </td>
            </tr>
            <tr>
              <td>Exemplo de tarefa</td>
              <td>30 minutos</td>
              <td>Há cerca de 20 minutos</td>
              <td>
                <ProjectStatus statusColor="yellow">Em andamento</ProjectStatus>
              </td>
            </tr>
            <tr>
              <td>Exemplo de tarefa</td>
              <td>30 minutos</td>
              <td>Há cerca de 20 minutos</td>
              <td>
                <ProjectStatus statusColor="red">Interrompido</ProjectStatus>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
