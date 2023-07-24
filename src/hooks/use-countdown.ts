/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useContext } from 'react'
import { CyclesContext } from '../contexts/CycleContext'
import { differenceInSeconds } from 'date-fns'

export function useCountdown() {
  const {
    activeCycle,
    addTotalSecondsAmountPassed,
    secondsPassedOnCountdown,
    markCurrentCycleAsFinished,
    secondsAmountPassed,
    totalSecondsAmountPassed,
  } = useContext(CyclesContext)

  const totalSecondsOfTaskTime = activeCycle ? activeCycle.minutes * 60 : 0
  const isActiveCyclePaused = activeCycle?.isPaused
  const isActiveCycleRestartedAfterPause =
    activeCycle?.restartedDate && !activeCycle.isPaused
  const isActiveCycleFinished = secondsAmountPassed >= totalSecondsOfTaskTime
  const timeInSecondsLeftOnCountdown = activeCycle
    ? totalSecondsOfTaskTime - secondsAmountPassed
    : 0

  const oneMinuteInSeconds = 60
  const minutesLeftOnCountdown = Math.floor(
    timeInSecondsLeftOnCountdown / oneMinuteInSeconds,
  )
  const secondsLeftOnCountdown =
    timeInSecondsLeftOnCountdown % oneMinuteInSeconds

  const minutesLeftOnCountdownView = String(minutesLeftOnCountdown).padStart(
    2,
    '0',
  )
  const secondsLeftOnCountdownView = String(secondsLeftOnCountdown).padStart(
    2,
    '0',
  )

  return {
    totalSecondsOfTaskTime,
    isActiveCyclePaused,
    isActiveCycleRestartedAfterPause,
    isActiveCycleFinished,
    minutesLeftOnCountdownView,
    secondsLeftOnCountdownView,
    stopCountdown: (interval: number) => {
      addTotalSecondsAmountPassed(secondsAmountPassed)
      clearInterval(interval)
    },
    restartCountdownAfterPause: () => {
      const secondsPassedAfterCycleRestarted = differenceInSeconds(
        new Date(),
        new Date(activeCycle?.restartedDate!),
      )
      secondsPassedOnCountdown(
        totalSecondsAmountPassed + secondsPassedAfterCycleRestarted,
      )
    },
    startCountdown: () => {
      const secondsPassedAfterCycleCreation = differenceInSeconds(
        new Date(),
        activeCycle?.startDate!,
      )
      addTotalSecondsAmountPassed(0)
      secondsPassedOnCountdown(secondsPassedAfterCycleCreation)
    },
    finishCycleCountdown: (interval: number) => {
      markCurrentCycleAsFinished()
      secondsPassedOnCountdown(totalSecondsOfTaskTime)
      clearInterval(interval)
    },
  }
}
