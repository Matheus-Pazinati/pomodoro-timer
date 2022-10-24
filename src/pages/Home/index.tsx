import { useEffect, useState } from 'react'

import { HandPalm, Play } from 'phosphor-react'
import {
  FormContainer,
  HomeContainer,
  StyleContainer,
  ProjectInput,
  ProjectMinutes,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'

import { Countdown } from '../../components/Countdown'

import { v4 as uuidv4 } from 'uuid'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { differenceInSeconds } from 'date-fns'

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
  startDate: Date
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
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])

    setActiveCycleId(newCycle.id)

    setSecondsAmountPassed(0)

    reset()
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const projectInput = watch('projectName')

  const isProjectInputValid = !projectInput

  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = setInterval(
        () =>
          setSecondsAmountPassed(
            differenceInSeconds(new Date(), activeCycle.startDate),
          ),
        1000,
      )
    }
    return () => {
      clearInterval(interval)
    }
  }, [activeCycle])

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

        <Countdown
          taskMinutes={activeCycle?.minutes}
          secondsPassed={secondsAmountPassed}
        />

        {activeCycle ? (
          <StopCountdownButton type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton
            disabled={isProjectInputValid}
            form="taskForm"
            type="submit"
          >
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </StyleContainer>
    </HomeContainer>
  )
}
