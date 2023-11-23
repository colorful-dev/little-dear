import React from 'react'
import { Box, IconButton, type IconButtonProps, Text } from '@chakra-ui/react'
import { Icon } from '@iconify/react'

interface IconItemProps extends IconButtonProps {
  hasLabel?: boolean
  hasDetail?: boolean
}

const IconItem: React.FC<IconItemProps> = ({ hasLabel, hasDetail, ...props }) => {
  return (
    <Box display="inline-flex" flexDirection="column" alignItems="center">
      <Box position="relative" fontSize="xs" color="gray.700">
        <IconButton {...props} />
        {hasDetail ? <Icon className="absolute -bottom-1 -right-1" icon="mingcute:more-3-fill" /> : null}
      </Box>
      {hasLabel ? <Text fontSize="sm">{props['aria-label']}</Text> : null}
    </Box>
  )
}

export default IconItem
