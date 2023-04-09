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

export const FoxRain = (): ReactElement => {
  const { left, top } = playAreaCoords({ left: 150, top: 294 })

  return (
    <FrameAnimation
      style={StyleSheet.flatten([styles.fox, { left, top }])}
      width={scaleWidth(134)}
      height={scaleHeight(153)}
      gap={0}
      duration={500}
      totalWidth={scaleWidth(670)}
      image={images.petRain}
    />
  )
}
