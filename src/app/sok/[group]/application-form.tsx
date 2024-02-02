"use client";

import { Group } from "@/lib/constants";
import { User } from "@/lib/db/schema";
import { WebkomApplication } from "./webkom-application";
import { GeneralApplication } from "./general-application";

export type ApplicationFormProps = {
  group: Group;
  user: User;
};

export const ApplicationForm = (props: ApplicationFormProps) => {
  switch (props.group) {
    case "webkom":
      return <WebkomApplication {...props} />;
    default:
      return <GeneralApplication {...props} />;
  }
};
