import { ActionTypes } from './actions'

import { produce } from 'immer'

export interface Cycle {
  id: string
  task: string
  minutes: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
  isPaused?: boolean
  restartedDate?: Date
}

export interface CycleState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function cyclesReducer(state: CycleState, action: any) {
  const currentCycleIndex = state.cycles.findIndex((cycle) => {
    return cycle.id === state.activeCycleId
  })
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.cycle)
        draft.activeCycleId = action.payload.cycle.id
      })

    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      return produce(state, (draft) => {
        if (currentCycleIndex < 0) {
          return state
        }
        draft.cycles[currentCycleIndex].interruptedDate = new Date()
        draft.cycles[currentCycleIndex].isPaused = false
        draft.activeCycleId = null
      })
    }

    case ActionTypes.FINISH_CURRENT_CYCLE: {
      return produce(state, (draft) => {
        if (currentCycleIndex < 0) {
          return state
        }

        draft.cycles[currentCycleIndex].finishedDate = new Date()
        draft.cycles[currentCycleIndex].isPaused = false
        draft.activeCycleId = null
      })
    }

    case ActionTypes.PAUSE_CURRENT_CYCLE: {
      return produce(state, (draft) => {
        if (currentCycleIndex < 0) {
          return state
        }

        draft.cycles[currentCycleIndex].isPaused = true
      })
    }

    case ActionTypes.RESTART_CURRENT_CYCLE: {
      return produce(state, (draft) => {
        if (currentCycleIndex < 0) {
          return state
        }

        draft.cycles[currentCycleIndex].isPaused = false
        draft.cycles[currentCycleIndex].restartedDate = new Date()
      })
    }
    default:
      return state
  }
}
