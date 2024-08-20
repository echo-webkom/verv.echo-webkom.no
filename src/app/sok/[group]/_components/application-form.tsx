"use client";

import { AuthUser } from "@/lib/auth/lucia";
import { Group } from "@/lib/constants";
import { GeneralApplication } from "./general-application";
import { WebkomApplication } from "./webkom-application";
import { BedkomApplication } from "./bedkom-application";

export type ApplicationFormProps = {
  group: Group;
  user: AuthUser;
};

export const ApplicationForm = (props: ApplicationFormProps) => {
  switch (props.group) {
    case "webkom":
      return <WebkomApplication {...props} />;
    case "bedkom":
      return <BedkomApplication {...props} />;
    default:
      return <GeneralApplication {...props} />;
  }
};
