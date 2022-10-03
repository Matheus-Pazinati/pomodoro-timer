import { Play } from 'phosphor-react'
import { HomeContainer } from './styles'

export function Home() {
  return (
    <HomeContainer>
      <form id="taskForm">
        <label htmlFor="">Vou trabalhar em</label>
        <input type="text" />
        <label htmlFor="">durante</label>
        <input type="number" />
        <span>minutos.</span>
      </form>

      <div>
        <span>0</span>
        <span>0</span>
        <span>:</span>
        <span>0</span>
        <span>0</span>
      </div>

      <button form="taskForm" type="submit">
        <Play size={24} />
        Começar
      </button>
    </HomeContainer>
  )
}
