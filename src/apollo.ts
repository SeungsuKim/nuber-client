import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink, concat, Operation, split } from "apollo-link";
import { onError } from "apollo-link-error";
import { HttpLink } from "apollo-link-http";
import { withClientState } from "apollo-link-state";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { toast } from "react-toastify";

const cache = new InMemoryCache();

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => {
      toast.error(`Unexpeced error: ${message}`);
    });
  }
  if (networkError) {
    toast.error(`Network error: ${networkError}`);
  }
});

const localStateLink = withClientState({
  cache,
  defaults: {
    auth: {
      __typename: "Auth",
      isSignedIn: Boolean(localStorage.getItem("token"))
    }
  },
  resolvers: {
    Mutation: {
      signUserIn: (_, { token }, { cache: appCache }) => {
        localStorage.setItem("token", token);
        appCache.writeData({
          data: {
            auth: {
              __typename: "Auth",
              isSignedIn: true
            }
          }
        });
        return null;
      },
      signUserOut: (_, __, { appCache }) => {
        localStorage.removeItem("token");
        appCache.writeData({
          data: {
            auth: {
              __typename: "Auth",
              isSignedIn: false
            }
          }
        });
        return null;
      }
    }
  }
});

const authMiddleware = new ApolloLink((operation: Operation, forward: any) => {
  operation.setContext({
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token") || ""
    }
  });
  return forward(operation);
});

const wsLink = new WebSocketLink({
  options: {
    connectionParams: {
      Authorization: "Bearer " + localStorage.getItem("token") || ""
    },
    reconnect: true
  },
  uri: "ws://localhost:4000/subscriptions"
});

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql"
});

const combinedLinks = split(
  ({ query }) => {
    const { kind, operation }: any = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    errorLink,
    localStateLink,
    concat(authMiddleware, combinedLinks)
  ])
});

export default client;
