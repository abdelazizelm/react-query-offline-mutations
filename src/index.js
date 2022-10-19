import { QueryClient, QueryClientProvider } from "react-query";
import { createWebStoragePersister } from "react-query/createWebStoragePersister";
import {
  persistQueryClient,
  PersistQueryClientProvider
} from "react-query/persistQueryClient";
import { ReactQueryDevtools } from "react-query/devtools";
import ReactDOM from "react-dom";
import App from "./App";

const queryClient = new QueryClient();
// const localStoragePersister = createWebStoragePersister(
//   { storage: window.localStorage,
//     key: 'reactQuery',
//     throttleTime: 1000
//   });

//   persistQueryClient({
//   queryClient,
//   persister: localStoragePersister,
//   dehydrateOptions: {
//     shouldDehydrateMutation: (_) => true,
//     dehydrateMutations: true
//   },
//   maxAge: Infinity
// });

// queryClient.resumePausedMutations();

const rootElement = document.getElementById("root");
ReactDOM.render(
  //<QueryClientProvider client={queryClient}>
  <PersistQueryClientProvider
    client={queryClient}
    persistOptions={{
      persister: createWebStoragePersister({ storage: window.localStorage })
    }}
    onSuccess={() => {
      // resume mutations after initial restore from localStorage was successful
      queryClient.resumePausedMutations().then(() => {
        queryClient.invalidateQueries();
      });
    }}
  >
    <App />
    <ReactQueryDevtools />
  </PersistQueryClientProvider>,
  //</QueryClientProvider>,
  rootElement
);
