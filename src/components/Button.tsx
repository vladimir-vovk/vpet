import { ReactElement } from 'react'
import { Image, TouchableOpacity } from 'react-native'

import { images } from 'src/constants'
import { BUTTON_SIZE } from 'src/constants'
import { scaleWidth } from 'src/utils'

type Props = {
  onPress: () => void
  type: 'fish' | 'poop' | 'sleep'
}

export const Button = ({ onPress, type }: Props): ReactElement => {
  const size = scaleWidth(BUTTON_SIZE)
  const imagesMap = {
    fish: images.buttonFish,
    poop: images.buttonPoop,
    sleep: images.buttonSleep
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={imagesMap[type]}
        style={{
          width: size,
          height: size
        }}
      />
    </TouchableOpacity>
  )
}
