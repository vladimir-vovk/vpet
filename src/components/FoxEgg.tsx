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

export const FoxEgg = ({ onEnd }: Props): ReactElement => {
  const { left, top } = playAreaCoords({ left: 125, top: 232 })

  return (
    <FrameAnimation
      style={StyleSheet.flatten([styles.fox, { left, top }])}
      width={scaleWidth(175)}
      height={scaleHeight(217)}
      gap={0}
      duration={500}
      totalWidth={scaleWidth(1225)}
      image={images.petEgg}
      loop={false}
      onEnd={onEnd}
    />
  )
}
