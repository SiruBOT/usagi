import { useSession } from "next-auth/react";
import Header from "@components/Header";

export default function Home() {
  const { data, status } = useSession();
  return (
    <div>
        <Header title="🎶" />
        {JSON.stringify(data)} {status}
    </div>
  );
}
