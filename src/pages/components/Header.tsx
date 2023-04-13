import Head from "next/head";

export default function Header({ title }: { title?: string }) {
  return (
    <Head>
      <title>{`${title ? "치노봇 | " + title : "치노봇"}`}</title>
      <meta property="og:title" content="치노봇 🎶" />
      <meta
        property="og:description"
        content="디스코드에서 친구들과 함께 음악을 들어보세요 :)"
      />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/images/og-image.png" />
      <meta name="theme-color" content="#7d7ece" />
    </Head>
  );
}
