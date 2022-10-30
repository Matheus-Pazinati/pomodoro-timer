import { useState, createContext } from 'react'

import { HandPalm, Play } from 'phosphor-react'
import {
  HomeContainer,
  StyleContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'

import { Countdown } from './components/Countdown'

import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { CycleForm } from './components/CycleForm'

const newCycleFormValidationSchema = zod.object({
  projectName: zod.string().min(1, 'Informe um nome para o projeto'),
  projectMinutes: zod
    .number()
    .min(5, 'Um ciclo deve conter no mínimo 5 minutos')
    .max(60, 'Um ciclo deve conter no máximo 60 minutos'),
})

export type NewCycleFormSchemaProps = zod.infer<
  typeof newCycleFormValidationSchema
>

export interface Cycle {
  id: string
  task: string
  minutes: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CycleContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  secondsAmountPassed: number
  markCurrentCycleAsFinished: () => void
  secondsPassedOnCountdown: (seconds: number) => void
  setCycleId: (id: string) => void
  setNewCycle: (cycle: Cycle) => void
}

export const CyclesContext = createContext({} as CycleContextType)

export function Home() {
  const newCycleForm = useForm<NewCycleFormSchemaProps>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      projectName: '',
      projectMinutes: 0,
    },
  })

  const { watch } = newCycleForm

  const [cycles, setCycles] = useState<Cycle[]>([])

  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const [secondsAmountPassed, setSecondsAmountPassed] = useState(0)

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  function secondsPassedOnCountdown(seconds: number) {
    setSecondsAmountPassed(seconds)
  }

  function setCycleId(id: string) {
    setActiveCycleId(id)
  }

  function setNewCycle(cycle: Cycle) {
    setCycles((state) => [...state, cycle])
  }

  function handleInterruptCycle() {
    const newCycleListWithTheInterruptedCycle = cycles.map((cycle) => {
      if (cycle.id === activeCycleId) {
        return { ...cycle, interruptedDate: new Date() }
      } else {
        return cycle
      }
    })
    setCycles(newCycleListWithTheInterruptedCycle)
    setActiveCycleId(null)
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const projectInput = watch('projectName')

  const isProjectInputValid = !projectInput

  return (
    <HomeContainer>
      <StyleContainer>
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished,
            secondsPassedOnCountdown,
            secondsAmountPassed,
            setCycleId,
            setNewCycle,
          }}
        >
          <FormProvider {...newCycleForm}>
            <CycleForm />
          </FormProvider>
          <Countdown />

          {activeCycle ? (
            <StopCountdownButton type="button" onClick={handleInterruptCycle}>
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
        </CyclesContext.Provider>
      </StyleContainer>
    </HomeContainer>
  )
}
