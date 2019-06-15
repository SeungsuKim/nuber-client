import ApolloClient, { Operation } from "apollo-boost";

const client = new ApolloClient({
  clientState: {
    defaults: {
      auth: {
        __typename: "Auth",
        isLoggedIn: Boolean(localStorage.getItem("token"))
      }
    },
    resolvers: {
      Mutation: {
        signUserIn: (_, { token }, { cache }) => {
          localStorage.setItem("token", token);
          cache.writeData({
            data: {
              auth: {
                __typename: "Auth",
                isLoggedIn: true
              }
            }
          });
          return null;
        },
        signUserOut: (_, __, { cache }) => {
          localStorage.removeItem("token");
          cache.writeData({
            data: {
              __typename: "Auth",
              isLoggedIn: false
            }
          });
          return null;
        }
      }
    }
  },
  request: async (operation: Operation) => {
    operation.setContext({
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token") || ""
      }
    });
  },
  uri: "http://localhost:4000/graphql"
});

export default client;
