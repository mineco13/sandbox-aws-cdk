import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ServiceStack } from './stack/service';
import { NetworkStack } from './stack/network';
import { SecurityStack } from './stack/security';

export class SandboxCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const networkStack = new NetworkStack(this, "network")
    const securityStack = new SecurityStack(this, "security", { vpc: networkStack.vpc })
    const serviceStack = new ServiceStack(this, "service", { vpc: networkStack.vpc, subnet: networkStack.subnet.public, securityGroup: securityStack.securityGroup, role: securityStack.role })
  }


}
