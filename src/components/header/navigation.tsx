type NavigationProps = {
  children: React.ReactNode;
};

export const Navigation = ({ children }: NavigationProps) => {
  return (
    <div className="flex-1">
      <ul className="flex items-center justify-end gap-4">{children}</ul>
    </div>
  );
};
