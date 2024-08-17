"use client";

export const LoginButton = () => {
  return (
    <a
      href="/auth/feide"
      className="group w-full block max-w-sm mx-auto bg-white border-black border-2"
    >
      <div className="bg-[#ffeabb] group-hover:bg-[#ffeec9] relative -right-2 font-semibold -top-2 group-hover:-top-1 group-hover:-right-1 duration-200 transition-all px-4 text-center py-1 border-black border-2">
        Logg inn
      </div>
    </a>
  );
};
