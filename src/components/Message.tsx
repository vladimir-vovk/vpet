import { ReactElement, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { useToast } from 'src/components/toast'
import { PetState, useGameState } from 'src/game/GameContext'
import { funEmojie, sadEmojie } from 'src/utils'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '20%',
    position: 'absolute',
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 10
  },
  messageWrapper: {
    marginTop: 14,
    padding: 20,
    backgroundColor: 'blueviolet',
    borderRadius: 10
  },
  message: {
    color: 'white',
    fontWeight: 'bold'
  }
})

export const Message = (): ReactElement => {
  const { state } = useGameState()
  const { showToast, hideToast } = useToast()

  useEffect(() => {
    switch (state.pet) {
      case PetState.Init:
        showToast(`Please tap to start the game ${funEmojie()}`)
        break
      case PetState.Hatching:
        hideToast()
        break
      case PetState.Dead:
        showToast(`Game over! ${sadEmojie()}\nPlease tap to start a new game.`)
    }
  }, [state])

  let isVisible = false
  let text = ''

  return isVisible ? (
    <View style={styles.container}>
      <View style={styles.messageWrapper}>
        <Text style={styles.message}>{text}</Text>
      </View>
    </View>
  ) : (
    <></>
  )
}
