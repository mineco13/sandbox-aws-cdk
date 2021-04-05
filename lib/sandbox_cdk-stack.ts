import { Stack, StackProps } from 'aws-cdk-lib';
import { CfnEgressOnlyInternetGateway, CfnInternetGateway, IVpc, RouterType, Subnet, SubnetConfiguration, SubnetSelection, SubnetType, Vpc } from 'aws-cdk-lib/lib/aws-ec2';
import { Construct } from 'constructs';

export class SandboxCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const vpc = new Vpc(this, "vpc", {
      cidr: "10.0.0.0/16",
      natGateways: 0,
      subnetConfiguration: [SubnetType.ISOLATED, SubnetType.PUBLIC].map(type => this.subnetConfig(type))
    })

  }

  subnetConfig(type: SubnetType) {
    return {
      cidrMask: 18, subnetType: type, name: type
    }
  }
}
