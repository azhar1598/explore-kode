"use client";

import { queryClient } from "@/lib/queryClient";
import { theme } from "@/theme";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <div className="">{children}</div>
      </MantineProvider>
    </QueryClientProvider>
  );
}
