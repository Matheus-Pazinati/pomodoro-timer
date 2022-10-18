import { useState } from 'react'

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

import { v4 as uuidv4 } from 'uuid'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

const newCycleFormValidationSchema = zod.object({
  projectName: zod.string().min(1, 'Informe um nome para o projeto'),
  projectMinutes: zod
    .number()
    .min(5, 'Um ciclo deve conter no mínimo 5 minutos')
    .max(60, 'Um ciclo deve conter no máximo 60 minutos'),
})

type NewCycleFormSchemaProps = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutes: number
}

export function Home() {
  const { register, handleSubmit, watch, reset } =
    useForm<NewCycleFormSchemaProps>({
      resolver: zodResolver(newCycleFormValidationSchema),
      defaultValues: {
        projectName: '',
        projectMinutes: 0,
      },
    })

  const [cycles, setCycles] = useState<Cycle[]>([])

  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const [secondsAmountPassed, setSecondsAmountPassed] = useState(0)

  function handleCreateNewCycle(data: NewCycleFormSchemaProps) {
    const newCycle: Cycle = {
      id: uuidv4(),
      task: data.projectName,
      minutes: data.projectMinutes,
    }

    setCycles((state) => [...state, newCycle])

    setActiveCycleId(newCycle.id)

    setInterval(() => setSecondsAmountPassed((state) => state + 1), 1000)

    reset()
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const totalSecondsOfTaskTime = activeCycle ? activeCycle.minutes * 60 : 0

  const currentSeconds = activeCycle
    ? totalSecondsOfTaskTime - secondsAmountPassed
    : 0

  const minutesAmount = Math.floor(currentSeconds / 60)

  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')

  const seconds = String(secondsAmount).padStart(2, '0')

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
            step={5}
            {...register('projectMinutes', { valueAsNumber: true })}
          />
          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <CountdownSeparator>:</CountdownSeparator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
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
