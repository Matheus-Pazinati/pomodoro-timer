import { useState, createContext, ReactNode, useReducer } from 'react'

export interface Cycle {
  id: string
  task: string
  minutes: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CycleContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  secondsAmountPassed: number
  markCurrentCycleAsFinished: () => void
  secondsPassedOnCountdown: (seconds: number) => void
  setCycleId: (id: string) => void
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
  const [cycles, dispatch] = useReducer((state: Cycle[], action: any) => {
    console.log(state)
    console.log(action)

    if (action.type === 'ADD_NEW_CYCLE') {
      return [...state, action.payload.cycle]
    }

    return state
  }, [])

  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const [secondsAmountPassed, setSecondsAmountPassed] = useState(0)

  function markCurrentCycleAsFinished() {
    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, finishedDate: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   }),
    // )
  }

  function secondsPassedOnCountdown(seconds: number) {
    setSecondsAmountPassed(seconds)
  }

  function setCycleId(id: string) {
    setActiveCycleId(id)
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
    // const newCycleListWithTheInterruptedCycle = cycles.map((cycle) => {
    //   if (cycle.id === activeCycleId) {
    //     return { ...cycle, interruptedDate: new Date() }
    //   } else {
    //     return cycle
    //   }
    // })
    // setCycles(newCycleListWithTheInterruptedCycle)
    // setActiveCycleId(null)
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
        setCycleId,
        setNewCycle,
        interruptActiveCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
