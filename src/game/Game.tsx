import { lockAsync, OrientationLock } from 'expo-screen-orientation'
import { ReactElement, useEffect, useRef } from 'react'

import { MOOD_TICKS, TICK, WEATHER_TICKS } from 'src/constants'

import { PetState, SceneState, useGameState } from './GameContext'
import { GameScreen } from './GameScreen'

export const Game = (): ReactElement => {
  const { state, dispatch } = useGameState()
  const datetime = useRef(Date.now())
  const clockRef = useRef(state.clock)

  /* Game init */
  useEffect(() => {
    const init = () => {
      console.log(' > init game ...')
      lockAsync(OrientationLock.LANDSCAPE)
    }

    /* game loop */
    const gameLoop = () => {
      requestAnimationFrame(gameLoop)

      const now = Date.now()
      if (now - datetime.current >= TICK) {
        datetime.current = now
        dispatch({ type: 'clock' })
      }
    }

    /* start game */
    init()
    gameLoop()
  }, [])

  /* Checking game clock */
  useEffect(() => {
    if (state.clock === clockRef.current) {
      return
    }

    const clock = state.clock
    clockRef.current = clock
    // console.log(' > game clock', clock)
    // console.log('    ', JSON.stringify(state, null, 2))

    if (clock % WEATHER_TICKS === 0) {
      dispatch({ type: 'change-weather' })
    }

    if (clock % MOOD_TICKS === 0 && state.pet === PetState.Rest) {
      dispatch({ type: 'change-mood' })
    }

    if (state.pet === PetState.Sleeping) {
      dispatch({ type: 'wakeup' })
    }

    if (
      state.dayNightTimer === 0 &&
      (state.scene === SceneState.Day || state.scene === SceneState.Rain)
    ) {
      dispatch({ type: 'night' })
    }

    if (state.dayNightTimer === 0 && state.scene === SceneState.Night) {
      dispatch({ type: 'day' })
    }

    if (state.hungryTimer === 0) {
      dispatch({ type: 'hungry' })
    }

    if (state.eatingTimer === 0) {
      dispatch({ type: 'finish-eating' })
    }

    if (state.moodTimer === 0) {
      dispatch({ type: 'change-mood-to-normal' })
    }

    if (state.poopTimer === 0) {
      dispatch({ type: 'poop' })
    }

    if (state.dieTimer === 0 && [PetState.Hungry, PetState.Pooping].includes(state.pet)) {
      dispatch({ type: 'die' })
    }
  }, [state])

  const onScreenTouch = () => {
    if (state.pet === PetState.Init || state.pet === PetState.Dead) {
      dispatch({ type: 'start' })
    }
  }

  return <GameScreen {...{ onScreenTouch }} />
}
