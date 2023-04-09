import { ReactElement } from 'react'
import { Image, StyleSheet, useWindowDimensions, View } from 'react-native'

import { Buttons } from 'src/components/Buttons'
import { images } from 'src/constants'
import { PetState, SceneState, useGameState } from 'src/game/GameContext'
import { playAreaDimensions } from 'src/utils/general'

const styles = StyleSheet.create({
  absolute: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    resizeMode: 'stretch'
  }
})

type Props = {
  children: ReactElement | ReactElement[]
}

export const PlayArea = ({ children }: Props): ReactElement => {
  const { state } = useGameState()
  const { width, height } = useWindowDimensions()
  const { width: playAreaWidth, height: playAreaHeight } = playAreaDimensions()
  const frameSize = width > height ? height : width

  const imageMap = {
    [SceneState.Day]: images.day,
    [SceneState.Night]: images.night,
    [SceneState.Rain]: images.rain
  }

  return (
    <View style={styles.absolute}>
      <View style={styles.absolute}>
        <View style={{ marginTop: -frameSize / 10 }}>
          <Image
            source={state.pet === PetState.Dead ? images.dead : imageMap[state.scene]}
            style={[styles.image, { width: playAreaWidth, height: playAreaHeight }]}
          />
          {children}
        </View>
      </View>

      <View>
        <Image
          source={images.frame}
          style={[styles.image, { width: frameSize, height: frameSize }]}
        />

        <Buttons />
      </View>
    </View>
  )
}
