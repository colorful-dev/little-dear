'use client'

import { useState } from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import { Icon } from '@iconify/react'
import IconItem from '../../_component/IconItem'

export interface IconInfo {
  categoryId: string | number
  label: string
  icon: string
  children?: IconInfo[]
}

export interface CategoryGridProps {
  icons: IconInfo[]
  defaultValue?: string | number
  normalVariant?: string
  activeVariant?: string
  onChange?: (value: string | number, item?: IconInfo) => void
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ icons, defaultValue = '', onChange, normalVariant = 'normal', activeVariant = 'danger' }) => {
  const [value, setValue] = useState(defaultValue)

  const handleItemClick = (value: string | number, item: IconInfo) => {
    setValue(value)
    onChange && onChange(value, item)
  }

  return (
    <Grid templateColumns="repeat(5, 1fr)" rowGap={4}>
      {
                icons.map((item, index) => {
                  const isActive = value === item.categoryId
                  const variant = isActive ? activeVariant : normalVariant
                  const hasDetail = Array.isArray(item.children) && !!item.children.length
                  return (
                    <GridItem key={index} display="flex" flexDirection="column" onClick={() => handleItemClick(item.categoryId, item)}>
                      <IconItem hasLabel={true} aria-label={item.label} variant={variant} icon={<Icon className="text-xl" icon={item.icon} />} hasDetail={hasDetail} />
                    </GridItem>
                  )
                })
            }
    </Grid>
  )
}

export default CategoryGrid
