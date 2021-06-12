import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NetworkStack } from './stack/network';
import { SaveCostStack } from './stack/save_cost';
import { SecurityStack } from './stack/security';
import { ServiceStack } from './stack/service';
import { UserGroupStack } from "./stack/user-group";

export class SandboxCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const networkStack = new NetworkStack(this, "network")
    const securityStack = new SecurityStack(this, "security", { vpc: networkStack.vpc })
    const userGroupStack = new UserGroupStack(this, "user-gorup");
    const serviceStack = new ServiceStack(this, "service", { vpc: networkStack.vpc, subnet: networkStack.subnet.public, securityGroup: securityStack.securityGroup, userGroup: userGroupStack.userGroup })
    const saveCostStack = new SaveCostStack(this, "save-cost")
  }


}
