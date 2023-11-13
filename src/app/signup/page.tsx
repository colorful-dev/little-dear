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
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

type FormValues = {
  phone: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const router = useRouter();
  const toast = useToast();

  const { isLoading, mutateAsync } = api.auth.register.useMutation({
    onSuccess() {
      toast({
        title: "Sign up successful",
        status: "success",
        position: "top",
      });
      router.replace("/");
    },
    onError(err) {
      toast({
        title: err.message,
        status: "error",
        position: "top",
      });
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync({
      phone: data.phone,
      password: data.password,
      confirmPassword: data.confirmPassword,
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
          <FormControl isInvalid={!!errors.confirmPassword}>
            <FormLabel>ConfirmPwd</FormLabel>
            <Input
              {...register("confirmPassword")}
              type="password"
              placeholder="confirmPassword"
            />
            <FormErrorMessage>
              {errors.confirmPassword?.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            type="submit"
            isLoading={isLoading}
            colorScheme="blue"
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
