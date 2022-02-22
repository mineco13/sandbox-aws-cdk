import {
  InstanceClass,
  InstanceProps,
  InstanceSize,
  InstanceType,
  ISecurityGroup,
  IVpc,
  MachineImage,
  SubnetSelection
} from "aws-cdk-lib/lib/aws-ec2";
import { IRole } from "aws-cdk-lib/lib/aws-iam";

export function ec2Props(vpc: IVpc, subnet: SubnetSelection, securityGroup: ISecurityGroup, role: IRole, userName: string): InstanceProps {
  return {
    instanceName: `${userName}-ubuntu`,
    instanceType: InstanceType.of(InstanceClass.T2, InstanceSize.MICRO),
    machineImage: MachineImage.genericLinux({
      "us-east-1": "ami-042e8287309f5df03",
    }),
    keyName: "brave_developer",
    vpc: vpc,
    vpcSubnets: subnet,
    securityGroup: securityGroup,
    role: role,
  };
}
