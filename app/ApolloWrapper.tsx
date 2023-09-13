"use client";
// ^ this file needs the "use client" pragma

import { ApolloLink, HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { getLoggedInUser } from "./lib";

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  function makeClient() {
    const currentUser: any = getLoggedInUser();
    const httpLink = new HttpLink({
      uri: "http://localhost:4000/graphql",
      headers: {
        Authorization: `Bearer ${currentUser?.access_token}`,
      },
      fetchOptions: { cache: "no-store" },
    });

    return new NextSSRApolloClient({
      cache: new NextSSRInMemoryCache(),
      link:
        typeof window === "undefined"
          ? ApolloLink.from([
              new SSRMultipartLink({
                stripDefer: true,
              }),
              httpLink,
            ])
          : httpLink,
    });
  }

  return (
    <>
      <ApolloNextAppProvider makeClient={makeClient}>
        {children}
      </ApolloNextAppProvider>
    </>
  );
}
