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

export const FoxWalking = (): ReactElement => {
  const { left, top } = playAreaCoords({ left: 152, top: 264 })

  return (
    <FrameAnimation
      style={StyleSheet.flatten([styles.fox, { left, top }])}
      width={scaleWidth(127)}
      height={scaleHeight(179)}
      gap={0}
      duration={500}
      totalWidth={scaleWidth(508)}
      image={images.petWalking}
    />
  )
}
