"use client";

import { Box, Button, FormControl, Input } from "@chakra-ui/react";
import { useState } from "react";
import PswInput from '../_components/PswInput';

export default function Page() {
  const [email, setEmail] = useState('') 
  const [pswFirst, setPswFirst] = useState('')
  const [pswSecond, setPswSecond] = useState('')
  const [isPwdInvalid, setIsPwdInvalid] = useState(false)

  const handleSignUp = () => {
    if (isPwdInvalid)
      return
    console.log(email, pswFirst, pswSecond);
  }

  return (
    <Box display="flex" flexDirection="column" padding="4" height="100vh" justifyContent="flex-end">
      <FormControl
        as="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSignUp()
        }}
        height={64}
        display={"flex"}
        flexDirection={"column"}
        isRequired
      >
        <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" marginY={2}></Input>
        <PswInput 
          inputPorps={{
            onChange: e => setPswFirst(e.target.value),
            value: pswFirst,
            placeholder: 'Password',
            minLength: 6
          }} 
          inputGroupProps={{
            marginY: 2
          }}
        ></PswInput>
        <PswInput
          inputPorps={{
            onChange: e => (setPswSecond(e.target.value), setIsPwdInvalid(pswFirst !== e.target.value)),
            value: pswSecond,
            placeholder: 'Password again',
            isInvalid: isPwdInvalid,
            minLength: 6
          }} 
          inputGroupProps={{
            marginY: 2
          }} 
        ></PswInput>
        <Button type="submit" marginY={6}> Sign up </Button>
      </FormControl>
    </Box>
  ) 
};
