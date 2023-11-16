'use client'

import { useState } from 'react'
import IconItem from "../_component/IconItem"
import { Icon, Grid, GridItem, Box } from '@chakra-ui/react'
import * as Icons from "react-icons/fa"
import { type IconType } from 'react-icons'

export interface IconInfo {
    id: string | number,
    label: string;
    icon: string;
}

export interface CategoryGridProps {
    icons: IconInfo[],
    defaultValue?: string | number;
    onChange?: (value: string | number, item?: IconInfo) => void;
}

const CategoryGridItem: React.FC<{ label: string; icon: IconType | undefined; isActive: boolean; }> = ({ label, icon, isActive }) => {
    const variant = isActive ? 'danger' : 'normal'
    return (
        <GridItem display="flex" flexDirection="column">
            <IconItem hasLabel={true} aria-label={label} variant={variant} icon={<Icon as={icon} />} />
        </GridItem>
    )
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ icons, defaultValue = '', onChange }) => {
    const [value, setValue] = useState(defaultValue)

    const handleItemClick = (value: string | number, item: IconInfo) => {
        setValue(value)
        onChange && onChange(value, item)
    }

    return (
        <Grid templateColumns="repeat(5, 1fr)" rowGap={4}>
            {
                icons.map((item, index) => {
                    const IconComponent = (Icons as Record<string, IconType>)[item.icon]
                    return (
                        <Box key={index} onClick={() => handleItemClick(item.id, item)}>
                            <CategoryGridItem label={item.label} icon={IconComponent} isActive={value === item.id} />
                        </Box>
                    )
                })
            }
        </Grid>
    )
}

export default CategoryGrid
