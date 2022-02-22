import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { config } from "./config/config";
import { NetworkStack } from './stack/network';
import { SaveCostStack } from './stack/save_cost';
import { SecurityStack } from './stack/security';
import { ServiceStack } from './stack/service';


export class SandboxCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const networkStack = new NetworkStack(this, "network")
    const securityStack = new SecurityStack(this, "security", { vpc: networkStack.vpc })
    config.users.forEach(user => { new ServiceStack(this, `${user}-personal`, { vpc: networkStack.vpc, subnet: networkStack.subnet.public, securityGroup: securityStack.securityGroup, userGroup: securityStack.userGroup, ssmRole: securityStack.ssmRole, userName: user }) })
    const saveCostStack = new SaveCostStack(this, "save-cost")
  }
}
