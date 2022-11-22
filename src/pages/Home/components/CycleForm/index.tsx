import { useContext } from 'react'
import { CyclesContext } from '../../../../contexts/CycleContext'
import { Cycle } from '../../../../reducers/cycles'
import { useFormContext } from 'react-hook-form'

import { v4 as uuidv4 } from 'uuid'

import { FormContainer, ProjectInput, ProjectMinutes } from './styles'

interface CycleFormProps {
  projectName: string
  projectMinutes: number
}

export function CycleForm() {
  const { activeCycle, secondsPassedOnCountdown, setNewCycle } =
    useContext(CyclesContext)

  const { handleSubmit, register, reset } = useFormContext<CycleFormProps>()

  function handleCreateNewCycle(data: CycleFormProps) {
    const newCycle: Cycle = {
      id: uuidv4(),
      task: data.projectName,
      minutes: data.projectMinutes,
      startDate: new Date(),
    }

    setNewCycle(newCycle)

    secondsPassedOnCountdown(0)

    reset()
  }

  return (
    <FormContainer id="taskForm" onSubmit={handleSubmit(handleCreateNewCycle)}>
      <label htmlFor="projectInput">Vou trabalhar em</label>
      <ProjectInput
        id="projectName"
        type="text"
        placeholder="Dê um nome para o seu projeto"
        list="projectSuggestions"
        disabled={!!activeCycle}
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
        disabled={!!activeCycle}
        {...register('projectMinutes', { valueAsNumber: true })}
      />
      <span>minutos.</span>
    </FormContainer>
  )
}
