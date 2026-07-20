import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/core/session";
import AddConceptForm from "./AddConceptForm";

export default async function AddConceptPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getUserSession();
  if (!session?.user) redirect(`/signin?redirect=/topics/${id}/add-concept`);

  return <AddConceptForm topicId={id} />;
}
