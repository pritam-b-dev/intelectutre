import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/core/session";
import AddTopicForm from "./AddTopicForm";

export default async function AddTopicPage() {
  const session = await getUserSession();
  if (!session?.user) redirect("/signin?redirect=/topics/add");

  return <AddTopicForm />;
}
