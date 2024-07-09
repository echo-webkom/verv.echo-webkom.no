type NavigationProps = {
  children: React.ReactNode;
};

export const Navigation = ({ children }: NavigationProps) => {
  return (
    <div>
      <ul className="flex items-center gap-4">{children}</ul>
    </div>
  );
};
