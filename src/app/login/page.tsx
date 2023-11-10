"use client";

import { Box, Button, FormControl, Input, useToast } from "@chakra-ui/react";
import { useState } from "react";
import PswInput from '../_components/PswInput';
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

export default function Page() {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')

  const router = useRouter()
  const toast = useToast()
  
  const handleLogin = api.user.login.useMutation({
    onSuccess() {
      toast({
        title: 'Log in successful',
        status: 'success',
        position: 'top'
      })
      router.replace('/')
    },
    onError(err) {
      toast({
        title: err.message,
        status: 'error',
        position: 'top'
      })
    }
  })

  return (
    <Box display="flex" flexDirection="column" padding="4" height="100vh" justifyContent="flex-end">
      <FormControl
        as="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin.mutate({
            username,
            password
          })
        }}
        height={64}
        display={"flex"}
        flexDirection={"column"}
        isRequired
      >
        <Input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" marginY={2}></Input>
        <PswInput 
          inputPorps={{
            onChange: e => setPassword(e.target.value),
            value: password,
            placeholder: 'Password',
            minLength: 6
          }} 
          inputGroupProps={{
            marginY: 2
          }}
        ></PswInput>
        <Button type="submit" marginTop={6}> Log in </Button>
        <Button marginY={2} onClick={() => router.push('/signup')} > Sign up </Button>
      </FormControl>
    </Box>
  ) 
};
