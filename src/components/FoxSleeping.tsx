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

export const FoxSleeping = (): ReactElement => {
  const { left, top } = playAreaCoords({ left: 372, top: 284 })

  return (
    <FrameAnimation
      style={StyleSheet.flatten([styles.fox, { left, top }])}
      width={scaleWidth(250)}
      height={scaleHeight(155)}
      gap={0}
      duration={500}
      totalWidth={scaleWidth(1000)}
      image={images.petSleeping}
    />
  )
}
