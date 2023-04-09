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

export const FoxEating = (): ReactElement => {
  const { left, top } = playAreaCoords({ left: 11, top: 295 })

  return (
    <FrameAnimation
      style={StyleSheet.flatten([styles.fox, { left, top }])}
      width={scaleWidth(207)}
      height={scaleHeight(148)}
      gap={0}
      duration={500}
      totalWidth={scaleWidth(2070)}
      image={images.petEating}
    />
  )
}
