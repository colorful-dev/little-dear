"use client";

import { Box, Button, FormControl, Input } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export function CreateTodo() {
  const router = useRouter();
  const [name, setName] = useState("");

  const createTodo = api.todo.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
    },
  });

  return (
    <FormControl
      as="form"
      onSubmit={(e) => {
        e.preventDefault();
        createTodo.mutate({ name });
      }}
      width="fit-content"
    >
      <Box display="flex">
        <Input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          width={300}
        />
        <Button type="submit" disabled={createTodo.isLoading}>
          {createTodo.isLoading ? "Submitting..." : "Submit"}
        </Button>
      </Box>
    </FormControl>
  );
}
