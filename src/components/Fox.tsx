import { ReactElement } from 'react'

import { PetMood, PetState, useGameState, WeatherState } from 'src/game/GameContext'

import { FoxDead } from './FoxDead'
import { FoxEating } from './FoxEating'
import { FoxEgg } from './FoxEgg'
import { FoxHappy } from './FoxHappy'
import { FoxHungry } from './FoxHungry'
import { FoxPooping } from './FoxPooping'
import { FoxRain } from './FoxRain'
import { FoxRest } from './FoxRest'
import { FoxSleeping } from './FoxSleeping'
import { FoxWalking } from './FoxWalking'

export const Fox = (): ReactElement => {
  const { state, dispatch } = useGameState()

  const onHatchingEnd = () => {
    dispatch({ type: 'rest' })
  }

  const onPoopingEnd = () => {
    dispatch({ type: 'finish-pooping' })
  }

  switch (state.pet) {
    case PetState.Hatching:
      return <FoxEgg onEnd={onHatchingEnd} />
    case PetState.Rest:
      switch (state.mood) {
        case PetMood.Happy:
          return <FoxHappy />
        case PetMood.Walking:
          return <FoxWalking />
        case PetMood.Sad:
          return <FoxRain />
        default:
          return state.weather === WeatherState.Rain ? <FoxRain /> : <FoxRest />
      }
    case PetState.Sleeping:
      return <FoxSleeping />
    case PetState.Hungry:
      return <FoxHungry />
    case PetState.Feeding:
      return <FoxEating />
    case PetState.Pooping:
      return <FoxPooping onEnd={onPoopingEnd} />
    case PetState.Dead:
      return <FoxDead />
  }

  return <></>
}
