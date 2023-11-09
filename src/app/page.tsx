
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
    <div>
      {
        todos.map(todo => <div key={todo.id}>{todo.name}</div>)
      }
      <CreateTodo />
    </div>
  );
}
