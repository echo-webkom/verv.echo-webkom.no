type NavigationProps = {
  children: React.ReactNode;
};

export const Navigation = ({ children }: NavigationProps) => {
  return (
    <div>
      <ul className="flex items-center">{children}</ul>
    </div>
  );
};
