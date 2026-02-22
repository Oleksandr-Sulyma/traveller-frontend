'use client'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"


interface Props {
    children: React.ReactNode
}

export default function TanStackProvider({ children }: Props) {
    const queryClient = new QueryClient

    return (
        <QueryClientProvider client={queryClient} >
            {children}
            <ReactQueryDevtools />
        </ QueryClientProvider>
    )

}