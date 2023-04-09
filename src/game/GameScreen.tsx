import { ReactElement } from 'react'
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native'

import { Background, Fox, Message, PlayArea, PoopBag, Rain } from 'src/components'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green'
  },
  absolute: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

type Props = {
  onScreenTouch: () => void
}

export const GameScreen = ({ onScreenTouch }: Props): ReactElement => {
  return (
    <TouchableWithoutFeedback onPress={onScreenTouch}>
      <View style={styles.container}>
        <Background />
        <Message />

        <PlayArea>
          <PoopBag />
          <Fox />
          <Rain />
        </PlayArea>
      </View>
    </TouchableWithoutFeedback>
  )
}
