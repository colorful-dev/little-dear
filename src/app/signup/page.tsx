"use client";

import { Box, Button, FormControl, Input, useToast } from "@chakra-ui/react";
import { useState } from "react";
import PswInput from '../_components/PswInput';
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isPwdInvalid, setIsPwdInvalid] = useState(false)
  const router = useRouter()
  const toast = useToast()
  const handleSignUp = api.user.register.useMutation({
    onSuccess() {
      toast({
        title: 'Sign up successful',
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
          if (isPwdInvalid)
            return
          handleSignUp.mutate({
            username,
            password,
            confirmPassword
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
        <PswInput
          inputPorps={{
            onChange: e => (setConfirmPassword(e.target.value), setIsPwdInvalid(password !== e.target.value)),
            value: confirmPassword,
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
