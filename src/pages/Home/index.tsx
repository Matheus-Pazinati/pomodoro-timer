import { HandPalm, HandPointing, Play, Prohibit } from 'phosphor-react'
import {
  HomeContainer,
  StyleContainer,
  StartCountdownButton,
  StopCountdownButton,
  PauseCountdownButton,
  ButtonsContainer,
  ResumeCountdownButton,
} from './styles'

import { Countdown } from './components/Countdown'

import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { CycleForm } from './components/CycleForm'
import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CycleContext'

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

export function Home() {
  const newCycleForm = useForm<NewCycleFormSchemaProps>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      projectName: '',
      projectMinutes: 0,
    },
  })

  const { activeCycle, interruptActiveCycle } = useContext(CyclesContext)

  const { watch } = newCycleForm

  const projectInput = watch('projectName')

  const isProjectInputValid = !projectInput

  const isPaused = false

  return (
    <HomeContainer>
      <StyleContainer>
        <FormProvider {...newCycleForm}>
          <CycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <ButtonsContainer>
            <StopCountdownButton type="button" onClick={interruptActiveCycle}>
              <Prohibit size={24} />
              Interromper
            </StopCountdownButton>
            {isPaused ? (
              <ResumeCountdownButton type="button">
                <HandPointing size={24} />
                Retomar
              </ResumeCountdownButton>
            ) : (
              <PauseCountdownButton type="button">
                <HandPalm size={24} />
                Pausar
              </PauseCountdownButton>
            )}
          </ButtonsContainer>
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
