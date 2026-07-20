import { notFound } from "next/navigation";
import TopicForm from "@/components/topics/TopicForm";
import { getTopic } from "@/lib/api/topics";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditTopicPage({ params }: PageProps) {
  const { id } = await params;

  const topic = await getTopic(id);

  if (!topic) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 min-h-screen text-zinc-900 dark:text-zinc-100 transition-colors">
      <h1 className="text-3xl font-bold mb-8 text-zinc-900 dark:text-zinc-100">
        Edit Topic
      </h1>

      <TopicForm mode="edit" topic={topic} />
    </div>
  );
}
