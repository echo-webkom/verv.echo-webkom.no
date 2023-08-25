import Programmerbar from "@/mdx/programmerbar.mdx";
import { Metadata } from "next";

export const metadata = {
  title: "Programmerbar",
  description: "Søk verv i Programmerbar!",
} satisfies Metadata;

export default function ProgrammerbarPage() {
  return <Programmerbar />;
}
