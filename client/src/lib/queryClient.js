import {
  QueryClient
} from '@tanstack/react-query'


// Keep one QueryClient instance for the whole app.
const queryClient = new QueryClient()
export default queryClient;

