"use client";

import { Box, Button, FormControl, Input } from "@chakra-ui/react";
import { useState } from "react";
import PswInput from '../_components/PswInput';

export default function Page() {
  const [email, setEmail] = useState('') 
  const [psw, setPsw] = useState('')

  const handleSignUp = () => {
    console.log(email, psw);
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
            onChange: e => setPsw(e.target.value),
            value: psw,
            placeholder: 'Password',
            minLength: 6
          }} 
          inputGroupProps={{
            marginY: 2
          }}
        ></PswInput>
        <Button type="submit" marginY={6}> Log in </Button>
      </FormControl>
    </Box>
  ) 
};
