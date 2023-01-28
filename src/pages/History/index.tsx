import { useContext } from 'react'

import { formatDistanceToNow } from 'date-fns'

import ptBR from 'date-fns/locale/pt-BR'

import { CyclesContext } from '../../contexts/CycleContext'

import { HistoryContainer, HistoryList, ProjectStatus } from './styles'

export function History() {
  const { cycles } = useContext(CyclesContext)
  return (
    <HistoryContainer>
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
            {cycles.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutes} minutos</td>
                  <td>
                    {formatDistanceToNow(new Date(cycle.startDate), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </td>
                  <td>
                    {cycle.finishedDate && (
                      <ProjectStatus statusColor="green">
                        Concluído
                      </ProjectStatus>
                    )}

                    {cycle.interruptedDate && (
                      <ProjectStatus statusColor="red">
                        Interrompido
                      </ProjectStatus>
                    )}

                    {cycle.isPaused && (
                      <ProjectStatus statusColor="blue">Pausado</ProjectStatus>
                    )}

                    {!cycle.finishedDate &&
                      !cycle.interruptedDate &&
                      !cycle.isPaused && (
                        <ProjectStatus statusColor="yellow">
                          Em andamento
                        </ProjectStatus>
                      )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
