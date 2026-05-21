import { Nav } from "@/components/nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#fbfaf6]">
      <Nav />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
