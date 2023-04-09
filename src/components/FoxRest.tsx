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

export const FoxRest = (): ReactElement => {
  const { left, top } = playAreaCoords({ left: 162, top: 278 })

  return (
    <FrameAnimation
      style={StyleSheet.flatten([styles.fox, { left, top }])}
      width={scaleWidth(124)}
      height={scaleHeight(165)}
      gap={0}
      duration={500}
      totalWidth={scaleWidth(364)}
      image={images.petRest}
    />
  )
}
