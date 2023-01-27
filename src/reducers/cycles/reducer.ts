import { ActionTypes } from './actions'

import { produce } from 'immer'

export interface Cycle {
  id: string
  task: string
  minutes: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
  pausedDate?: Date
}

export interface CycleState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function cyclesReducer(state: CycleState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.cycle)
        draft.activeCycleId = action.payload.cycle.id
      })

    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      const interruptedCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId
      })
      return produce(state, (draft) => {
        if (interruptedCycleIndex < 0) {
          return state
        }
        draft.cycles[interruptedCycleIndex].interruptedDate = new Date()
        draft.activeCycleId = null
      })
    }

    case ActionTypes.FINISH_CURRENT_CYCLE: {
      const finishedCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId
      })
      return produce(state, (draft) => {
        if (finishedCycleIndex < 0) {
          return state
        }

        draft.cycles[finishedCycleIndex].finishedDate = new Date()
        draft.activeCycleId = null
      })
    }

    case ActionTypes.PAUSE_CURRENT_CYCLE: {
      const pausedCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId
      })
      return produce(state, (draft) => {
        if (pausedCycleIndex < 0) {
          return state
        }

        draft.cycles[pausedCycleIndex].pausedDate = new Date()
      })
    }
    default:
      return state
  }
}
