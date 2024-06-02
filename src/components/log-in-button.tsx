"use client";

export const LogInButton = () => {
  const handleClick = () => {
    window.location.href = "/auth/feide";
  };

  return (
    <button onClick={handleClick} className="group w-full max-w-sm bg-white">
      <div className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none">
        Logg inn
      </div>
    </button>
  );
};
