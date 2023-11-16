import React from 'react'
import { IconButton, type IconButtonProps, Box, Text, Icon } from '@chakra-ui/react'
import { CiCircleMore } from "react-icons/ci"
import { type IconType } from 'react-icons'

interface IconItemProps extends IconButtonProps {
    hasLabel?: boolean;
    hasDetail?: boolean;
}

const IconItem: React.FC<IconItemProps> = ({ hasLabel, hasDetail, ...props }) => {
    return (
        <Box display="inline-flex" flexDirection="column" alignItems="center">
            <Box position="relative">
                <IconButton {...props} />
                {hasDetail ? <Icon position="absolute" bottom={-1} right={-1} boxSize="0.8em" as={CiCircleMore as IconType} /> : null}
            </Box>
            {hasLabel ? <Text fontSize='sm'>{props['aria-label']}</Text> : null}
        </Box>
    )
}

export default IconItem