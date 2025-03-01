"use client";
import { useQuery } from "@apollo/client";
import { GET_TASKS } from "@/app/api/graphql/queries";

export default function TaskList() {
  const { loading, error, data } = useQuery(GET_TASKS);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar tarefas</p>;

  return (
    <ul>
      {data.tasks.map((task: { id: string; title: string; completed: boolean }) => (
        <li key={task.id}>
          {task.title} {task.completed ? "✅" : "❌"}
        </li>
      ))}
    </ul>
  );
}
