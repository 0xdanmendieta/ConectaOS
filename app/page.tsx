import { redirect } from "next/navigation";
import { DEFAULT_PROCESS_CODE } from "@/lib/data";

export default function Home() {
  redirect(`/proceso/${DEFAULT_PROCESS_CODE}`);
}
