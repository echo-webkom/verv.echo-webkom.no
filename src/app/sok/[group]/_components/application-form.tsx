"use client";

import { Group } from "@/lib/constants";
import { WebkomApplication } from "./webkom-application";
import { GeneralApplication } from "./general-application";
import { AuthUser } from "@/lib/auth/lucia";

export type ApplicationFormProps = {
  group: Group;
  user: AuthUser;
};

export const ApplicationForm = (props: ApplicationFormProps) => {
  switch (props.group) {
    case "webkom":
      return <WebkomApplication {...props} />;
    default:
      return <GeneralApplication {...props} />;
  }
};
