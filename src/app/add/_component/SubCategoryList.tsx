import { forwardRef, useImperativeHandle } from 'react'
import { Drawer, DrawerBody, DrawerContent, DrawerOverlay, Flex, Stack, StackDivider, Text, useDisclosure } from '@chakra-ui/react'
import { Icon } from '@iconify/react'
import type { IconInfo } from './CategoryGrid'
import IconItem from '~/app/_component/IconItem'

interface SubCategoryListProps {
  list: IconInfo[]
  defaultValue: IconInfo | null
  onChange?: (item: IconInfo) => void
}

export interface SubCategoryListRefProps {
  open: () => void
  close: () => void
}

const SubCategoryList = forwardRef<SubCategoryListRefProps, SubCategoryListProps>((props, ref) => {
  const { list, defaultValue, onChange } = props
  const { isOpen, onOpen, onClose } = useDisclosure()

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        onOpen && onOpen()
      },
      close: () => {
        onClose && onClose()
      },
    }
  }, [onClose, onOpen])

  const onRowClick = (item: IconInfo) => {
    onChange && onChange(item)
  }

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
                <Flex key={index} alignItems="center" justifyContent="space-between" padding={2} onClick={() => onRowClick(item)}>
                  <Flex alignItems="center" gap={3}>
                    <IconItem aria-label={item.label} variant="normal" icon={<Icon className="text-xl" icon={item.icon} />} />
                    <Text>{item.label}</Text>
                  </Flex>
                  { defaultValue?.categoryId === item.categoryId ? <Icon className="text-primary-500" icon="ion:checkmark-sharp" /> : null }
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
