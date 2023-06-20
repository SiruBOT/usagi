import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Layout from "@components/Layout";
import "@/styles/globals.css";
import ErrorBoundary from "@/utils/ErrorBoundary";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      {process.env.NODE_ENV !== "production" ? (
        <ReactQueryDevtools initialIsOpen={true} />
      ) : null}
      <ErrorBoundary>
        <SessionProvider session={pageProps.session}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}
