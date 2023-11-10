"use client"

import { Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import type { InputProps, InputGroupProps } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState } from "react"

export default function PswInput({inputGroupProps, inputPorps}: {inputGroupProps: InputGroupProps, inputPorps: InputProps}) {
  const [pswVisible, setPswVisible] = useState(false)
  return (
    <InputGroup {...inputGroupProps}>
      <Input
        {...inputPorps}
        type={pswVisible ? 'text' : 'password'}
      />
      <InputRightElement width={10} onClick={() => setPswVisible(!pswVisible)} >
        {
          pswVisible ? <ViewOffIcon color='gray.300' /> :
          <ViewIcon color='gray.300' />
        }
      </InputRightElement>
    </InputGroup>
  )
}