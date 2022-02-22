#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import "source-map-support/register";
import { SandboxCdkStack } from "../lib/sandbox_cdk-stack";

const app = new cdk.App();
new SandboxCdkStack(app, "SandboxCdkStack");
