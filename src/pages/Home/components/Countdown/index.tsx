import { useEffect, useContext } from 'react'
import { CyclesContext } from '../../../../contexts/CycleContext'
import { CountdownContainer, CountdownSeparator } from './styles'
import { useCountdown } from '../../../../hooks/use-countdown'

export function Countdown() {
  const { activeCycle } = useContext(CyclesContext)

  const {
    isActiveCycleFinished,
    isActiveCyclePaused,
    isActiveCycleRestartedAfterPause,
    finishCycleCountdown,
    minutesLeftOnCountdownView,
    restartCountdownAfterPause,
    secondsLeftOnCountdownView,
    startCountdown,
    stopCountdown,
  } = useCountdown()

  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        if (isActiveCyclePaused) {
          stopCountdown(interval)
        } else if (isActiveCycleRestartedAfterPause) {
          restartCountdownAfterPause()
        } else {
          startCountdown()
        }

        if (isActiveCycleFinished) {
          finishCycleCountdown(interval)
        }
      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    finishCycleCountdown,
    isActiveCycleFinished,
    isActiveCyclePaused,
    isActiveCycleRestartedAfterPause,
    restartCountdownAfterPause,
    startCountdown,
    stopCountdown,
  ])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutesLeftOnCountdownView}:${secondsLeftOnCountdownView}`
    }
  }, [minutesLeftOnCountdownView, secondsLeftOnCountdownView, activeCycle])

  return (
    <CountdownContainer>
      <span>{minutesLeftOnCountdownView[0]}</span>
      <span>{minutesLeftOnCountdownView[1]}</span>
      <CountdownSeparator>:</CountdownSeparator>
      <span>{secondsLeftOnCountdownView[0]}</span>
      <span>{secondsLeftOnCountdownView[1]}</span>
    </CountdownContainer>
  )
}
