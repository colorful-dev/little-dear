import { forwardRef, useImperativeHandle } from 'react'
import { Drawer, DrawerBody, DrawerContent, DrawerOverlay, Flex, Stack, StackDivider, Text, useDisclosure } from '@chakra-ui/react'
import { Icon } from '@iconify/react'
import type { IconInfo } from './CategoryGrid'
import IconItem from '~/app/_component/IconItem'

interface SubCategoryListProps {
  list: IconInfo[]
  onChange?: () => void
}

export interface SubCategoryListRefProps {
  open: () => void
}

const SubCategoryList = forwardRef<SubCategoryListRefProps, SubCategoryListProps>((props, ref) => {
  const { list } = props
  const { isOpen, onOpen, onClose } = useDisclosure()

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        onOpen && onOpen()
      },
    }
  }, [onOpen])

  return (
    <Drawer
      isOpen={isOpen}
      placement="bottom"
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerBody maxHeight="50vh">
          <Stack divider={<StackDivider />}>
            {
              list.map((item, index) => (
                <Flex key={index} alignItems="center" gap={4} padding={2}>
                  <IconItem aria-label={item.label} variant="normal" icon={<Icon className="text-xl" icon={item.icon} />} />
                  <Text>{ item.label }</Text>
                </Flex>
              ))
            }
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
})

export default SubCategoryList
