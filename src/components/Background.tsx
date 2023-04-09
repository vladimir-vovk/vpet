import { ReactElement } from 'react'
import { Image, useWindowDimensions } from 'react-native'

import { images } from 'src/constants'

export const Background = (): ReactElement => {
  const { width, height } = useWindowDimensions()

  return <Image style={{ width, height }} source={images.background} />
}
