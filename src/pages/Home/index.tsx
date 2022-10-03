import { Play } from 'phosphor-react'
import {
  FormContainer,
  HomeContainer,
  StyleContainer,
  ProjectInput,
  ProjectMinutes,
  CountdownContainer,
  CountdownSeparator,
  StartCountdownButton,
} from './styles'

export function Home() {
  return (
    <HomeContainer>
      <StyleContainer>
        <FormContainer id="taskForm">
          <label htmlFor="projectInput">Vou trabalhar em</label>
          <ProjectInput
            id="projectInput"
            type="text"
            placeholder="Dê um nome para o seu projeto"
          />
          <label htmlFor="projectMinutes">durante</label>
          <ProjectMinutes id="projectMinutes" type="number" placeholder="00" />
          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <CountdownSeparator>:</CountdownSeparator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton form="taskForm" type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </StyleContainer>
    </HomeContainer>
  )
}
