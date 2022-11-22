import { useState, createContext, ReactNode, useReducer } from 'react'
import { Cycle, cyclesReducer } from '../reducers/cycles'

interface CycleContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  secondsAmountPassed: number
  markCurrentCycleAsFinished: () => void
  secondsPassedOnCountdown: (seconds: number) => void
  setNewCycle: (cycle: Cycle) => void
  interruptActiveCycle: () => void
}

export const CyclesContext = createContext({} as CycleContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cycleState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  })

  const [secondsAmountPassed, setSecondsAmountPassed] = useState(0)

  const { cycles, activeCycleId } = cycleState

  function secondsPassedOnCountdown(seconds: number) {
    setSecondsAmountPassed(seconds)
  }

  function setNewCycle(cycle: Cycle) {
    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        cycle,
      },
    })
  }

  function interruptActiveCycle() {
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload: {
        activeCycleId,
      },
    })
  }

  function markCurrentCycleAsFinished() {
    dispatch({
      type: 'FINISH_CURRENT_CYCLE',
      payload: cycles,
    })
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        secondsPassedOnCountdown,
        secondsAmountPassed,
        setNewCycle,
        interruptActiveCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
