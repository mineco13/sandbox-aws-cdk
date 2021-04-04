#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { SandboxCdkStack } from '../lib/sandbox_cdk-stack';

const app = new cdk.App();
new SandboxCdkStack(app, 'SandboxCdkStack');
