import { differenceInSeconds } from 'date-fns'
import {
  useState,
  createContext,
  ReactNode,
  useReducer,
  useEffect,
} from 'react'

import {
  addNewCycleAction,
  interruptActiveCycleAction,
  markCurrentCycleAsFinishedAction,
  pauseActiveCycleAction,
  restartActiveCycleAction,
} from '../reducers/cycles/actions'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'

interface CycleContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  secondsAmountPassed: number
  markCurrentCycleAsFinished: () => void
  secondsPassedOnCountdown: (seconds: number) => void
  setNewCycle: (cycle: Cycle) => void
  interruptActiveCycle: () => void
  pauseActiveCycle: () => void
  restartActiveCycle: () => void
}

export const CyclesContext = createContext({} as CycleContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}

interface EmptyCycleStateProps {
  cycles: never[]
  activeCycleId: null
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const initializerArg = {
    cycles: [],
    activeCycleId: null,
  }

  function getSavedCyclesFromLocalStorage(initialValue: EmptyCycleStateProps) {
    const cyclesStateJSON = localStorage.getItem(
      '@ignite-timer:cycles-state-1.0.0',
    )
    if (cyclesStateJSON) {
      return JSON.parse(cyclesStateJSON)
    }
    return initialValue
  }

  const [cycleState, dispatch] = useReducer(
    cyclesReducer,
    initializerArg,
    getSavedCyclesFromLocalStorage,
  )

  useEffect(() => {
    const cycleStateJSON = JSON.stringify(cycleState)
    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', cycleStateJSON)
  }, [cycleState])

  const { cycles, activeCycleId } = cycleState

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [secondsAmountPassed, setSecondsAmountPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }
    return 0
  })

  function secondsPassedOnCountdown(seconds: number) {
    setSecondsAmountPassed(seconds)
  }

  function setNewCycle(cycle: Cycle) {
    dispatch(addNewCycleAction(cycle))
  }

  function interruptActiveCycle() {
    dispatch(interruptActiveCycleAction())
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())
  }

  function pauseActiveCycle() {
    dispatch(pauseActiveCycleAction())
  }

  function restartActiveCycle() {
    dispatch(restartActiveCycleAction())
  }

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
        pauseActiveCycle,
        restartActiveCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
