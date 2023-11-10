
import { Box, ListItem, UnorderedList } from "@chakra-ui/react";
import { CreateTodo } from "~/app/_components/create-todo";
import { api } from "~/trpc/server";

export default function Home() {

  return (
    <main>
      <div>

        <CrudShowcase />
      </div>
    </main>
  );
}

async function CrudShowcase() {
  const todos = await api.todo.list.query();

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <UnorderedList marginX="10" marginY="5" width={300}>
        {
          todos.map(todo => <ListItem key={todo.id}>{todo.name}</ListItem>)
        }
      </UnorderedList> 
      <CreateTodo />
    </Box>
  );
}
