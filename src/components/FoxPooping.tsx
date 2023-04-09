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

type Props = {
  onEnd: () => void
}

export const FoxPooping = ({ onEnd }: Props): ReactElement => {
  const { left, top } = playAreaCoords({ left: 126, top: 260 })

  return (
    <FrameAnimation
      style={StyleSheet.flatten([styles.fox, { left, top }])}
      width={scaleWidth(204)}
      height={scaleHeight(202)}
      gap={0}
      duration={500}
      totalWidth={scaleWidth(2040)}
      image={images.petPooping}
      loop={false}
      onEnd={onEnd}
    />
  )
}
