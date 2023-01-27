import { Cycle } from './reducer'

export enum ActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  FINISH_CURRENT_CYCLE = 'FINISH_CURRENT_CYCLE',
  PAUSE_CURRENT_CYCLE = 'PAUSE_CURRENT_CYCLE',
}

export function addNewCycleAction(cycle: Cycle) {
  return {
    type: ActionTypes.ADD_NEW_CYCLE,
    payload: {
      cycle,
    },
  }
}

export function interruptActiveCycleAction() {
  return {
    type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
  }
}

export function markCurrentCycleAsFinishedAction() {
  return {
    type: ActionTypes.FINISH_CURRENT_CYCLE,
  }
}

export function pauseActiveCycleAction() {
  return {
    type: ActionTypes.PAUSE_CURRENT_CYCLE,
  }
}
