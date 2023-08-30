import { groupEnum, studyEnum, yearEnum } from "./db/schema";

export type Year = (typeof yearEnum.enumValues)[number];
export type Study = (typeof studyEnum.enumValues)[number];
export type Group = (typeof groupEnum.enumValues)[number];

export const APPLICATION_DEADLINE = new Date("2023-09-11");

export const yearNames = {
  1: "1. året",
  2: "2. året",
  3: "3. året",
  4: "4. året",
  5: "5. året",
} satisfies Record<Year, string>;

export const studyNames = {
  DTEK: "Datateknologi",
  DSIK: "Datasikkerhet",
  DVIT: "Datavitenskap",
  BINF: "Bioinformatikk",
  IMO: "Informatikk-matematikk-økonomi",
  INF: "Master i Informatikk",
  PROG: "Felles master i programvareutvikling",
  DSC: "Master i Data Science",
  OTHER: "Annet (ikke på listen)",
} satisfies Record<Study, string>;

export const groupNames = {
  webkom: "Webkom",
  tilde: "Tilde",
  bedkom: "Bedkom",
  makerspace: "Makerspace",
  hyggkom: "Hyggkom",
  gnist: "Gnist",
  esc: "echo Sports Club",
  programmerbar: "Programmerbar",
} satisfies Record<Group, string>;
