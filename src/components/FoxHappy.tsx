import { ReactElement } from 'react'
import { StyleSheet } from 'react-native'

import { images } from 'src/constants'
import { playAreaCoords, scaleHeight, scaleWidth } from 'src/utils'

import { FrameAnimation } from './FrameAnimation'

const styles = StyleSheet.create({
  fox: {
    position: 'absolute'
  }
})

export const FoxHappy = (): ReactElement => {
  const { left, top } = playAreaCoords({ left: 162, top: 228 })

  return (
    <FrameAnimation
      style={StyleSheet.flatten([styles.fox, { left, top }])}
      width={scaleWidth(131)}
      height={scaleHeight(213)}
      gap={0}
      duration={500}
      totalWidth={scaleWidth(655)}
      image={images.petHappy}
    />
  )
}
