import { useContext } from 'react'

import { CyclesContext, Cycle, NewCycleFormSchemaProps } from '../..'

import { v4 as uuidv4 } from 'uuid'

import { FormContainer, ProjectInput, ProjectMinutes } from './styles'

import { useFormContext } from 'react-hook-form'

export function CycleForm() {
  const { activeCycle, secondsPassedOnCountdown, setCycleId, setNewCycle } =
    useContext(CyclesContext)

  const { handleSubmit, register, reset } =
    useFormContext<NewCycleFormSchemaProps>()

  function handleCreateNewCycle(data: NewCycleFormSchemaProps) {
    const newCycle: Cycle = {
      id: uuidv4(),
      task: data.projectName,
      minutes: data.projectMinutes,
      startDate: new Date(),
    }

    setNewCycle(newCycle)

    setCycleId(newCycle.id)

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
