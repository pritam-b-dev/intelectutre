import { redirect } from "next/navigation";

export default function NewTopicPageRedirect() {
  redirect("/topics/add");
}
