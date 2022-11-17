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

  return (
    <HomeContainer>
      <StyleContainer>
        <FormProvider {...newCycleForm}>
          <CycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={interruptActiveCycle}>
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
