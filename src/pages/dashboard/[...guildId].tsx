import { useRouter } from "next/router";

export default function Dashboard() {
    const router = useRouter();
    return (
        <>
            <h1>{router.query.guildId}</h1>
        </>
    )
}
