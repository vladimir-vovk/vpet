import { useWindowDimensions } from 'react-native'

import { PLAY_AREA_HEIGHT, PLAY_AREA_WIDTH } from 'src/constants'

type PlayAreaDimensionsResult = {
  width: number
  height: number
}

export const playAreaDimensions = (): PlayAreaDimensionsResult => {
  const { width, height } = useWindowDimensions()
  const value = width > height ? height : width // depends on "orientation"

  const frameBottomHeight = value / 6 /* Approximate value */
  const playAreaWidth = value - frameBottomHeight
  const playAreaHeight = playAreaWidth / (PLAY_AREA_WIDTH / PLAY_AREA_HEIGHT)

  return {
    width: playAreaWidth,
    height: playAreaHeight
  }
}

type PlayAreaCoords = {
  top: number
  left: number
}

export const playAreaCoords = ({ left, top }: PlayAreaCoords): PlayAreaCoords => {
  const { width, height } = playAreaDimensions()

  const playAreaTop = (top * height) / PLAY_AREA_HEIGHT
  const playAreaLeft = (left * width) / PLAY_AREA_WIDTH

  return {
    left: playAreaLeft,
    top: playAreaTop
  }
}

export const scaleWidth = (w: number): number => {
  const { width } = playAreaDimensions()
  return (w * width) / PLAY_AREA_WIDTH
}

export const scaleHeight = (h: number): number => {
  const { height } = playAreaDimensions()
  return (h * height) / PLAY_AREA_HEIGHT
}

export const funEmojie = (): string => {
  const emojies = ['🕹️', '🎮', '🌈', '🦊', '😻']
  const emojie = emojies[Math.floor(Math.random() * emojies.length)]

  return emojie
}

export const sadEmojie = (): string => {
  const emojies = ['🥲', '☠️', '😵‍💫', '💀', '😵', '😬']
  const emojie = emojies[Math.floor(Math.random() * emojies.length)]

  return emojie
}

export const random = (arr: any[]): any => {
  return arr[Math.floor(Math.random() * arr.length)]
}
