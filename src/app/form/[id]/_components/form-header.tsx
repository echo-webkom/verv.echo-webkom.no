type FormHeaderProps = {
  title: string;
  description: string | null;
};

export const FormHeader = ({ title, description }: FormHeaderProps) => {
  return (
    <div className="border-b-2 bg-gray-100 py-24 pb-6">
      <div className="mx-auto max-w-screen-md px-6">
        <h1 className="mb-2 text-4xl font-semibold text-gray-800">{title}</h1>
        {Boolean(description) && (
          <div className="text-lg text-muted-foreground">
            {description?.split("\n").map((line, i) => (
              <p className="py-2" key={i}>
                {line}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
