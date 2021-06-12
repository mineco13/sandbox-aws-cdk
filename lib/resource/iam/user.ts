import { SecretValue } from "aws-cdk-lib";
import { IInstance } from "aws-cdk-lib/lib/aws-ec2";
import {
  IGroup,
  PolicyStatementProps,
  UserProps,
} from "aws-cdk-lib/lib/aws-iam";
import { config } from "../../../bin/sandbox_cdk";

export function userProps(userName: string, groups: IGroup[]): UserProps {
  return {
    userName: userName,
    groups: groups,
    password: SecretValue.plainText(
      userName[0].toUpperCase() + userName.slice(1)
    ),
    passwordResetRequired: false,
  };
}
export function operateEc2Props(instance: IInstance): PolicyStatementProps {
  return {
    actions: ["ec2:StartInstances", "ec2:StopInstances"],
    resources: [
      `arn:aws:ec2:${config.region}:${config.accountId}:instance/${instance.instanceId}`,
    ],
  };
}
