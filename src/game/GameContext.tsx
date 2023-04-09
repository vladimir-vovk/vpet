import { createContext, ReactElement, useContext, useReducer } from 'react'

import { DAY_TICKS, NIGHT_TICKS, RAIN_CHANCE } from 'src/constants'
import { random } from 'src/utils'

type Action = {
  type:
    | 'clock'
    | 'init'
    | 'start'
    | 'rest'
    | 'hungry'
    | 'feeding'
    | 'finish-eating'
    | 'poop'
    | 'finish-pooping'
    | 'clean-poops'
    | 'sleep'
    | 'wakeup'
    | 'die'
    | 'change-mood'
    | 'change-mood-to-normal'
    | 'change-weather'
    | 'day'
    | 'night'
}

export enum WeatherState {
  Clear = 'CLEAN',
  Rain = 'RAIN'
}

export enum SceneState {
  Day = 'DAY',
  Night = 'NIGHT',
  Rain = 'RAIN'
}

export enum PetState {
  Init = 'INIT',
  Hatching = 'HATCHING',
  Rest = 'REST',
  Hungry = 'HUNGRY',
  Sleeping = 'SLEEPING',
  Feeding = 'FEEDING',
  Pooping = 'POOPING',
  Celebrating = 'CELEBRATING',
  Dead = 'DEAD'
}

export enum PetMood {
  Normal = 'NORMAL',
  Happy = 'HAPPY',
  Walking = 'WALKING',
  Sad = 'SAD'
}

export type GameState = {
  clock: number
  dayNightTimer: number
  hungryTimer: number
  poopTimer: number
  poopBagTimer: number
  dieTimer: number
  eatingTimer: number
  moodTimer: number
  pet: PetState
  mood: PetMood
  scene: SceneState
  weather: WeatherState
}

const getWeather = () => {
  if (Math.random() < RAIN_CHANCE) {
    return WeatherState.Rain
  }

  return WeatherState.Clear
}

const getHungryTime = () => Math.floor(Math.random() * 10) + 5 // Duration before hungry
const getDieTime = () => Math.floor(Math.random() * 5) + 5 // Die after hungry
const getEatingTime = () => Math.floor(Math.random() * 9) + 2 // Eat time duration
const getPoopTime = () => Math.floor(Math.random() * 3) + 3 // Poop after eat
const getPoopBagTime = () => Math.floor(Math.random() * 3) + 1 // Poop bag duration
const getMoodTime = () => Math.floor(Math.random() * 2) + 2 // Current mood duration

const initialGameState: GameState = {
  clock: 0,
  dayNightTimer: DAY_TICKS,
  hungryTimer: getHungryTime(),
  poopTimer: -1,
  poopBagTimer: -1,
  dieTimer: -1,
  eatingTimer: -1,
  moodTimer: -1,
  pet: PetState.Init,
  mood: PetMood.Normal,
  scene: SceneState.Day,
  weather: WeatherState.Clear
}

const reducer = (state: GameState, action: Action) => {
  // console.log('action', action, JSON.stringify(state, null, 2))

  switch (action.type) {
    case 'clock':
      if ([PetState.Init, PetState.Dead].includes(state.pet)) {
        return state
      }

      if (state.pet === PetState.Sleeping) {
        return {
          ...state,
          clock: state.clock + 1
        }
      }

      return {
        ...state,
        clock: state.clock + 1,
        dayNightTimer: state.dayNightTimer - 1,
        hungryTimer: state.hungryTimer - 1,
        poopTimer: state.poopTimer - 1,
        poopBagTimer: state.poopBagTimer - 1,
        dieTimer: state.dieTimer - 1,
        eatingTimer: state.eatingTimer - 1,
        moodTimer: state.moodTimer - 1
      }

    case 'start':
      return {
        ...initialGameState,
        pet: PetState.Hatching,
        hungryTimer: getHungryTime()
      }

    case 'rest':
      return {
        ...state,
        pet: PetState.Rest
      }

    case 'sleep':
      return {
        ...state,
        pet: PetState.Sleeping
      }

    case 'wakeup':
      if (Math.random() <= 0.3) {
        return {
          ...state,
          pet: PetState.Rest
        }
      }
      return state

    case 'change-mood':
      if (Math.random() <= 0.6) {
        return {
          ...state,
          mood: random([PetMood.Happy, PetMood.Normal, PetMood.Sad, PetMood.Walking]),
          moodTimer: getMoodTime()
        }
      }
      return state

    case 'change-mood-to-normal':
      return {
        ...state,
        mood: PetMood.Normal,
        moodTimer: -1
      }

    case 'change-weather':
      const weather = getWeather()
      let scene = state.scene

      if (weather === WeatherState.Clear && scene === SceneState.Rain) {
        scene = SceneState.Day
      }

      if (weather === WeatherState.Rain && scene === SceneState.Day) {
        scene = SceneState.Rain
      }

      return {
        ...state,
        weather,
        scene
      }

    case 'day':
      scene = state.weather === WeatherState.Rain ? SceneState.Rain : SceneState.Day
      return {
        ...state,
        scene,
        dayNightTimer: DAY_TICKS
      }

    case 'night':
      scene = SceneState.Night
      return {
        ...state,
        scene,
        dayNightTimer: NIGHT_TICKS
      }

    case 'hungry':
      return {
        ...state,
        hungryTimer: -1,
        dieTimer: getDieTime(),
        pet: PetState.Hungry
      }

    case 'feeding':
      return {
        ...state,
        dieTimer: -1,
        eatingTimer: getEatingTime(),
        pet: PetState.Feeding
      }

    case 'finish-eating':
      const nextAction = Math.random() <= 0.6 ? 'poop' : 'eat'
      let nextMood = Math.random() <= 0.7 ? PetMood.Happy : PetMood.Normal

      return {
        ...state,
        pet: PetState.Rest,
        mood: nextMood,
        moodTimer: nextMood === PetMood.Happy ? getMoodTime() : -1,
        eatingTimer: -1,
        dieTimer: -1,
        poopTimer: nextAction === 'poop' ? getPoopTime() : -1,
        hungryTimer: nextAction === 'eat' ? getHungryTime() : -1
      }

    case 'poop':
      return {
        ...state,
        pet: PetState.Pooping,
        poopTimer: -1
      }

    case 'finish-pooping':
      return {
        ...state,
        poopTimer: -1,
        dieTimer: getDieTime()
      }

    case 'clean-poops':
      nextMood = Math.random() <= 0.7 ? PetMood.Happy : PetMood.Normal
      return {
        ...state,
        pet: PetState.Rest,
        dieTimer: -1,
        hungryTimer: getHungryTime(),
        mood: nextMood,
        moodTimer: getMoodTime(),
        poopBagTimer: getPoopBagTime()
      }

    case 'die':
      return {
        ...state,
        pet: PetState.Dead
      }
  }

  return state
}

type GameContextType = {
  state: GameState
  dispatch: (action: Action) => void
}

const GameContext = createContext<GameContextType>({ state: initialGameState, dispatch: () => {} })

type Props = {
  children: ReactElement | ReactElement[]
}

export const GameContextProvider = ({ children }: Props): ReactElement => {
  const [state, dispatch] = useReducer(reducer, initialGameState)

  return (
    <GameContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

type UseGameState = { state: GameState; dispatch: (action: Action) => void }

export const useGameState = (): UseGameState => {
  return useContext<GameContextType>(GameContext)
}
