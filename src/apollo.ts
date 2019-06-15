import ApolloClient, { Operation } from "apollo-boost";

const client = new ApolloClient({
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
