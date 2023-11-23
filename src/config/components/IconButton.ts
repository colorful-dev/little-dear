import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

interface StyleConfig {
  color: string
  background?: string
  normalColor?: string | number
  normalBackground?: string | number
  hoverColor?: string | number
  hoverBackground?: string | number
}

function generateStyle({ color, background = color, normalColor = 500, normalBackground = 50, hoverColor = 600, hoverBackground = 100 }: StyleConfig) {
  return defineStyle({
    color: `${color}.${normalColor}`,
    background: `${background}.${normalBackground}`,

    _hover: {
      color: `${color}.${hoverColor}`,
      background: `${background}.${hoverBackground}`,
    },
    _active: {
      color: `${color}.${hoverColor}`,
      background: `${background}.${hoverBackground}`,
    },
  })
}

const normal = generateStyle({ color: 'primary', background: 'gray', normalBackground: 200, hoverColor: 600, hoverBackground: 300 })

const danger = generateStyle({ color: 'danger' })

export const iconButtonTheme = defineStyleConfig({
  variants: { normal, danger },
})
