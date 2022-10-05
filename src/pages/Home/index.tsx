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
            list="projectSuggestions"
          />
          <datalist id="projectSuggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
          </datalist>
          <label htmlFor="projectMinutes">durante</label>
          <ProjectMinutes
            id="projectMinutes"
            type="number"
            placeholder="00"
            defaultValue={5}
            step={5}
            min={5}
            max={60}
          />
          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <CountdownSeparator>:</CountdownSeparator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled form="taskForm" type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </StyleContainer>
    </HomeContainer>
  )
}
