"use client";

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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createTodo.mutate({ name });
      }}
      
    >
      <input
        type="text"
        placeholder="Title"
        value={name}
        onChange={(e) => setName(e.target.value)}
        
      />
      <button
        type="submit"
        disabled={createTodo.isLoading}
      >
        {createTodo.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
