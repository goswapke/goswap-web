export const metadata = { title: "GoSwap", description: "Lease or swap vehicles" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body><main style={{maxWidth:960,margin:"0 auto",padding:20}}>{children}</main></body></html>);
}
