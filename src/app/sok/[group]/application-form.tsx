"use client";

import { Group } from "@/lib/constants";
import { User } from "@/lib/db/schema";
import { BedkomApplication } from "./bedkom-application";
import { GeneralApplication } from "./general-application";

export type ApplicationFormProps = {
  group: Group;
  user: User;
};

export const ApplicationForm = (props: ApplicationFormProps) => {
  switch (props.group) {
    case "bedkom":
      return <BedkomApplication {...props} />;
    default:
      return <GeneralApplication {...props} />;
  }
};