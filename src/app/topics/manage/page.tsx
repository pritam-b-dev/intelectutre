export const dynamic = "force-dynamic";
import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/core/session";
import { getMyTopics } from "@/lib/api/topics";
import ManageTopicsClient from "./ManageTopicsClient";

export default async function ManageTopicsPage() {
  const session = await getUserSession();
  if (!session?.user) redirect("/signin?redirect=/topics/manage");

  const { items: topics } = await getMyTopics().catch(() => ({
    items: [],
    total: 0,
  }));

  return <ManageTopicsClient initialTopics={topics} />;
}
