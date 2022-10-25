import { useEffect } from 'react'
import { CountdownContainer, CountdownSeparator } from './styles'

interface CountdownProps {
  taskMinutes: number | undefined
  secondsPassed: number
}

export function Countdown({ taskMinutes, secondsPassed }: CountdownProps) {
  const totalSecondsOfTaskTime = taskMinutes ? taskMinutes * 60 : 0

  const currentSeconds = taskMinutes
    ? totalSecondsOfTaskTime - secondsPassed
    : 0

  const minutesAmount = Math.floor(currentSeconds / 60)

  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')

  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (taskMinutes) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, taskMinutes])

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
