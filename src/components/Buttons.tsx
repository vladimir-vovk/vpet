import { ReactElement } from 'react'
import { StyleSheet, useWindowDimensions, View } from 'react-native'

import { BUTTON_SIZE } from 'src/constants'
import { PetState, useGameState } from 'src/game/GameContext'
import { scaleWidth } from 'src/utils'

import { Button } from './Button'

const styles = StyleSheet.create({
  container: {
    color: 'lightgreen'
  },
  panel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  buttonsWrapper: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
})

const isHidden = (state: PetState): Boolean => {
  const hiddenStates = [PetState.Init, PetState.Hatching, PetState.Dead]
  return hiddenStates.includes(state)
}

export const Buttons = (): ReactElement => {
  const { state, dispatch } = useGameState()
  const { width, height } = useWindowDimensions()
  const panelWidth = width > height ? height : width
  const buttonSize = scaleWidth(BUTTON_SIZE)

  if (isHidden(state.pet)) {
    return <></>
  }

  const onFish = () => {
    if (state.pet === PetState.Hungry) {
      dispatch({ type: 'feeding' })
    }
  }

  const onPoop = () => {
    if (state.pet === PetState.Pooping && state.dieTimer > 0) {
      dispatch({ type: 'clean-poops' })
    }
  }

  const onSleep = () => {
    if (state.pet === PetState.Rest) {
      dispatch({ type: 'sleep' })
    } else if (state.pet === PetState.Sleeping) {
      dispatch({ type: 'wakeup' })
    }
  }

  return (
    <View style={[styles.panel, { marginBottom: buttonSize / 3 }]}>
      <View style={[styles.buttonsWrapper, { width: panelWidth }]}>
        <Button onPress={onFish} type="fish" />
        <Button onPress={onPoop} type="poop" />
        <Button onPress={onSleep} type="sleep" />
      </View>
    </View>
  )
}
