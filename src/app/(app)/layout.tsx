import { Header } from "@/components/header";

type AppLayoutProps = {
  children: React.ReactNode;
};

export default async function AppLayout({ children }: AppLayoutProps) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
