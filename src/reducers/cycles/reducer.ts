import { ActionTypes } from './actions'

export interface Cycle {
  id: string
  task: string
  minutes: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export interface CycleState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function cyclesReducer(state: CycleState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.cycle],
        activeCycleId: action.payload.cycle.id,
      }

    case ActionTypes.INTERRUPT_CURRENT_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, interruptedDate: new Date() }
          } else {
            return cycle
          }
        }),
        activeCycleId: null,
      }

    case ActionTypes.FINISH_CURRENT_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, finishedDate: new Date() }
          } else {
            return cycle
          }
        }),
        activeCycleId: null,
      }
    default:
      return state
  }
}
