import { ReactElement } from 'react'
import { StyleSheet } from 'react-native'

import { images } from 'src/constants'
import { PetState, useGameState } from 'src/game/GameContext'
import { playAreaCoords, scaleHeight, scaleWidth } from 'src/utils'

import { FrameAnimation } from './FrameAnimation'

const styles = StyleSheet.create({
  fox: {
    position: 'absolute'
  }
})

export const PoopBag = (): ReactElement => {
  const { state } = useGameState()
  const { left, top } = playAreaCoords({ left: 90, top: 190 })
  const width = scaleWidth(99)
  const height = scaleHeight(104)
  const totalWidth = scaleWidth(297)

  if (state.poopBagTimer > 0 && ![PetState.Init, PetState.Dead].includes(state.pet)) {
    return (
      <FrameAnimation
        style={StyleSheet.flatten([styles.fox, { left, top }])}
        width={width}
        height={height}
        gap={0}
        duration={200}
        totalWidth={totalWidth}
        image={images.poopBag}
      />
    )
  }

  return <></>
}
