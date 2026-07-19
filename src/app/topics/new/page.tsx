import TopicForm from "@/components/topics/TopicForm";

export default function NewTopicPage() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Create New Topic</h1>

      <TopicForm mode="create" />
    </div>
  );
}
