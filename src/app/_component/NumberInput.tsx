import {
  Grid,
  type GridItemProps,
  GridItem as GridItemRaw,
} from '@chakra-ui/react'
import React from 'react'
import { Icon } from '@iconify/react'
import { withDefaultProps } from '../_util'

function range(start: number, end: number) {
  const length = end - start + 1
  return Array.from({ length }, (_, i) => start + i)
}

function GridItem({
  children,
  autoH,
  ...props
}: GridItemProps & { autoH?: boolean }) {
  return (
    <GridItemRaw
      {...props}
      w="100%"
      h={autoH ? 'auto' : 20}
      className={`s-fcc active:opacity-75 ${props.className}`}
    >
      {children}
    </GridItemRaw>
  )
}

export interface NumberInputProps {
  /**
   * @default 'transparent'
   */
  background?: string
  /**
   * @default ''
   */
  confirmButtonClass?: string

  value: number
  onChange: (value: number) => void
}

/**
 * append: append new number to the end of current number
 * remove: remove the last bit of number of current number
 */
const operationMap = {
  append: (v: number, v2: number) => v * 10 + v2,
  remove: (v: number) => Math.floor(v / 10),
}

export const NumberInput = withDefaultProps(
  (props: NumberInputProps) => {
    const { background, confirmButtonClass, onChange, value } = props

    return (
      <div className="flex">
        <Grid
          templateColumns="repeat(3, 1fr)"
          className="flex-[3]"
          background={background}
        >
          {/* 1 ~ 9 */}
          {range(1, 9).map(n => (
            <GridItem
              onClick={() => onChange(operationMap.append(value, n))}
              key={n}
            >
              {n}
            </GridItem>
          ))}
          {/* - 0 . */}
          <GridItem>-</GridItem>
          <GridItem onClick={() => onChange(operationMap.append(value, 0))}>
            0
          </GridItem>
          <GridItem>.</GridItem>
        </Grid>
        <Grid templateRows="1fr 1fr 2fr" className="flex-[1]">
          {/* operations */}
          <GridItem onClick={() => onChange(operationMap.remove(value))}>
            <Icon
              icon="material-symbols:backspace-rounded"
              className="text-3xl"
            />
          </GridItem>
          <GridItem>+</GridItem>
          <GridItem autoH className={confirmButtonClass}>
            完成
          </GridItem>
        </Grid>
      </div>
    )
  },
  {
    background: 'transparent',
  },
)
