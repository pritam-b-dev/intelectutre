import TopicForm from "@/components/topics/TopicForm";

export default function NewTopicPage() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 min-h-screen text-zinc-900 dark:text-zinc-100 transition-colors">
      <h1 className="text-3xl font-bold mb-8 text-zinc-900 dark:text-zinc-100">
        Create New Topic
      </h1>

      <TopicForm mode="create" />
    </div>
  );
}
