import { useEffect, useRef, useState } from 'react'
import { Image, View, ViewStyle } from 'react-native'

type Props = {
  width: number
  height: number
  gap: number
  totalWidth: number
  duration: number
  image: any
  style?: ViewStyle
  loop?: boolean
  onEnd?: () => void
}

export const FrameAnimation = ({
  width,
  height,
  gap,
  totalWidth,
  duration,
  image,
  style,
  loop = true,
  onEnd
}: Props) => {
  const [frame, setFrame] = useState(0)
  const frameRef = useRef(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      const f = frameRef.current
      const nextFramePos = (f + 1) * width
      const nextFrame = nextFramePos >= totalWidth ? (loop ? 0 : f) : f + 1
      frameRef.current = nextFrame
      setFrame(nextFrame)

      if (nextFramePos >= totalWidth && !loop) {
        if (onEnd) {
          onEnd()
        }

        if (intervalId) {
          clearInterval(intervalId)
        }
      }
    }, duration)

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [])

  return (
    <View
      style={[
        {
          width,
          height,
          overflow: 'hidden',
          position: 'relative'
        },
        style
      ]}
    >
      <Image
        source={image}
        style={{
          width: totalWidth,
          height,
          position: 'absolute',
          top: 0,
          left: -width * frame - gap * frame
        }}
      />
    </View>
  )
}
