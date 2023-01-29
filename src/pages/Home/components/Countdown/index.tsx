import { differenceInSeconds } from 'date-fns'
import { useEffect, useContext } from 'react'
import { CyclesContext } from '../../../../contexts/CycleContext'
import { CountdownContainer, CountdownSeparator } from './styles'

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    secondsPassedOnCountdown,
    secondsAmountPassed,
    totalSecondsAmountPassed,
    addTotalSecondsAmountPassed,
  } = useContext(CyclesContext)
  const totalSecondsOfTaskTime = activeCycle ? activeCycle.minutes * 60 : 0

  const currentSeconds = activeCycle
    ? totalSecondsOfTaskTime - secondsAmountPassed
    : 0

  const minutesAmount = Math.floor(currentSeconds / 60)

  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')

  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        let secondsDifference: number
        if (activeCycle.isPaused) {
          addTotalSecondsAmountPassed(secondsAmountPassed)
          clearInterval(interval)
          return
        } else if (activeCycle.restartedDate && !activeCycle.isPaused) {
          secondsDifference = differenceInSeconds(
            new Date(),
            new Date(activeCycle.restartedDate),
          )
          secondsPassedOnCountdown(totalSecondsAmountPassed + secondsDifference)
        } else if (!activeCycle.restartedDate && !activeCycle.isPaused) {
          secondsDifference = differenceInSeconds(
            new Date(),
            activeCycle.startDate,
          )
          addTotalSecondsAmountPassed(0)
          secondsPassedOnCountdown(secondsDifference)
        }

        if (secondsAmountPassed >= totalSecondsOfTaskTime) {
          markCurrentCycleAsFinished()
          secondsPassedOnCountdown(totalSecondsOfTaskTime)
          clearInterval(interval)
        }
      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    totalSecondsOfTaskTime,
    activeCycleId,
    markCurrentCycleAsFinished,
    secondsPassedOnCountdown,
    secondsAmountPassed,
    totalSecondsAmountPassed,
    addTotalSecondsAmountPassed,
  ])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <CountdownSeparator>:</CountdownSeparator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
