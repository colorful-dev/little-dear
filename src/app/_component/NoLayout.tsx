import { cookies } from "next/headers";
import { TRPCReactProvider } from "~/trpc/react";

export default function NoLayout({ children }: { children: React.ReactNode }) {
  return (
    <TRPCReactProvider cookies={cookies().toString()}>
      {children}
    </TRPCReactProvider>
  );
}
