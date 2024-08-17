export default function GroupLayout({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto flex w-full max-w-2xl flex-col px-6">{children}</div>;
}
