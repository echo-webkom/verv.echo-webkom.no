"use client";

export const LoginButton = () => {
  return (
    <a
      href="/auth/feide"
      className="group mx-auto block w-full max-w-sm border-2 border-black bg-white"
    >
      <div className="relative -right-2 -top-2 border-2 border-black bg-[#ffeabb] px-4 py-1 text-center font-semibold transition-all duration-200 group-hover:-right-1 group-hover:-top-1 group-hover:bg-[#ffeec9]">
        Logg inn
      </div>
    </a>
  );
};
