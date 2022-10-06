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

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

const newCycleFormValidationSchema = zod.object({
  projectName: zod.string().min(1, 'Informe um nome para o projeto'),
  projectMinutes: zod
    .number()
    .min(5, 'Um ciclo deve conter no mínimo 5 minutos')
    .max(60, 'Um ciclo deve conter no máximo 5 minutos'),
})

export function Home() {
  const { register, handleSubmit, watch, formState } = useForm({
    resolver: zodResolver(newCycleFormValidationSchema),
  })

  console.log(formState.errors)

  function handleCreateNewCycle(data: any) {
    console.log(data)
  }

  const projectInput = watch('projectName')

  const isProjectInputValid = !projectInput

  return (
    <HomeContainer>
      <StyleContainer>
        <FormContainer
          id="taskForm"
          onSubmit={handleSubmit(handleCreateNewCycle)}
        >
          <label htmlFor="projectInput">Vou trabalhar em</label>
          <ProjectInput
            id="projectName"
            type="text"
            placeholder="Dê um nome para o seu projeto"
            list="projectSuggestions"
            {...register('projectName', { required: true })}
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
            {...register('projectMinutes', { valueAsNumber: true })}
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

        <StartCountdownButton
          disabled={isProjectInputValid}
          form="taskForm"
          type="submit"
        >
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </StyleContainer>
    </HomeContainer>
  )
}
