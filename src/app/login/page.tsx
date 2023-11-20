"use client";

import {
  Box,
  FormControl,
  FormErrorMessage,
  Input,
  FormLabel,
  Button,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import React from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from "~/server/db/schema";
import type { z } from "zod";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema)
  });

  const router = useRouter();
  const toast = useToast();
  const { mutateAsync, isLoading, error } = api.auth.login.useMutation();
  const onSubmit = handleSubmit(async (data) => {
    const res = await mutateAsync({
      phone: data.phone,
      password: data.password,
    });
    if (res.userId) {
      toast({
        title: "Log in successful",
        status: "success",
        position: "top",
      });
      router.replace("/");
      return;
    }
    toast({
      title: error!.message,
      status: "error",
      position: "top",
    });
  });

  return (
    <Box
      display="flex"
      flexDirection="column"
      padding="4"
      height="100vh"
      justifyContent="flex-end"
    >
      <form onSubmit={onSubmit}>
        <VStack>
          <FormControl isInvalid={!!errors.phone}>
            <FormLabel>Phone</FormLabel>
            <Input {...register("phone")} placeholder="Phone" />
            <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              {...register("password")}
              type="password"
              placeholder="Password"
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
          <Button
            type="submit"
            colorScheme="blue"
            isLoading={isLoading}
            w="300px"
            mt={4}
          >
            Login
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
