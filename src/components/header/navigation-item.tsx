type NavigationItemProps = {
  show: boolean;
  children: React.ReactNode;
};

export const NavigationItem = ({ show, children }: NavigationItemProps) => {
  if (!show) {
    return null;
  }

  return <li>{children}</li>;
};
