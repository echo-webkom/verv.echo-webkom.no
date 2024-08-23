type ProgressBarProps = {
  precentage: number;
};

export const ProgressBar = ({ precentage }: ProgressBarProps) => {
  const _precentage = Math.min(100, +precentage);

  return (
    <div className="flex h-4 w-full flex-row items-center overflow-hidden rounded-full">
      <div
        className="h-full bg-blue-400"
        style={{
          width: `${precentage}%`,
        }}
      />
      <div
        className="h-full bg-red-400"
        style={{
          width: `${100 - _precentage}%`,
        }}
      />
    </div>
  );
};
