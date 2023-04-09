import { ReactElement } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { Toast, ToastProvider } from 'src/components/toast'
import { Game } from 'src/game'
import { GameContextProvider } from 'src/game/GameContext'

export default function App(): ReactElement {
  return (
    <SafeAreaProvider>
      <GameContextProvider>
        <ToastProvider
          config={{
            timeout: 0,
            top: 24,
            textStyle: {
              fontSize: 15,
              fontWeight: '500'
            },
            containerStyle: {
              backgroundColor: 'blueviolet',
              borderRadius: 10
            }
          }}
        >
          <Game />
          <Toast />
        </ToastProvider>
      </GameContextProvider>
    </SafeAreaProvider>
  )
}
