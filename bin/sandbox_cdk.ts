#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import "source-map-support/register";
import { SandboxCdkStack } from "../lib/sandbox_cdk-stack";

export const config = {
  accountId: "357166315744",
  region: "us-east-1",
} as const;
const app = new cdk.App();
new SandboxCdkStack(app, "SandboxCdkStack");
