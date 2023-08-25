export default function GroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col max-w-2xl w-full mx-auto px-6">
      {children}
    </div>
  );
}
