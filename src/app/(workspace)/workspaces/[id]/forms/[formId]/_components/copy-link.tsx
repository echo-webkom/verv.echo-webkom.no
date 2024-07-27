"use client";

import { ExternalLink } from "lucide-react";
import { toast } from "sonner";

import { BASE_URL } from "@/constants";

type CopyLinkProps = {
  formId: string;
};

export const CopyLink = ({ formId }: CopyLinkProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(`${BASE_URL}/form/${formId}`);
    toast.success("Lenke kopiert");
  };

  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <button onClick={handleCopy} className="hover:underline">
        Kopier lenke
      </button>
      <ExternalLink aria-hidden="true" className="h-4 w-4" />
    </div>
  );
};
