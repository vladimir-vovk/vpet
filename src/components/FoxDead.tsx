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

export const FoxDead = (): ReactElement => {
  const { left, top } = playAreaCoords({ left: 174, top: 316 })

  return (
    <FrameAnimation
      style={StyleSheet.flatten([styles.fox, { left, top }])}
      width={scaleWidth(118)}
      height={scaleHeight(119)}
      gap={0}
      duration={500}
      totalWidth={scaleWidth(353)}
      image={images.petDead}
    />
  )
}
