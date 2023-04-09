import { ReactElement } from 'react'
import { StyleSheet } from 'react-native'

import { images } from 'src/constants'
import { useGameState, WeatherState } from 'src/game/GameContext'
import { playAreaCoords, scaleHeight, scaleWidth } from 'src/utils'

import { FrameAnimation } from './FrameAnimation'

const styles = StyleSheet.create({
  fox: {
    position: 'absolute'
  }
})

export const Rain = (): ReactElement => {
  const { state } = useGameState()
  const { left, top } = playAreaCoords({ left: 0, top: 0 })
  const width = scaleWidth(606)
  const height = scaleHeight(516)
  const totalWidth = scaleWidth(1817)

  if (state.weather === WeatherState.Rain) {
    return (
      <FrameAnimation
        style={StyleSheet.flatten([styles.fox, { left, top }])}
        width={width}
        height={height}
        gap={0}
        duration={200}
        totalWidth={totalWidth}
        image={images.rainDrops}
      />
    )
  }

  return <></>
}
