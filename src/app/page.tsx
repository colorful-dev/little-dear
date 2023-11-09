
import { CreateTodo } from "~/app/_components/create-todo";
import { api } from "~/trpc/server";
import styles from "./index.module.css";

export default function Home() {

  return (
    <main className={styles.main}>
      <div className={styles.container}>

        <CrudShowcase />
      </div>
    </main>
  );
}

async function CrudShowcase() {
  const todos = await api.todo.list.query();

  return (
    <div className={styles.showcaseContainer}>
      {
        todos.map(todo => <div key={todo.id}>{todo.name}</div>)
      }
      <CreateTodo />
    </div>
  );
}
