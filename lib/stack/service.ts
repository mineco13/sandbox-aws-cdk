import { Stack, StackProps } from "aws-cdk-lib";
import {
  Instance,
  ISecurityGroup,
  IVpc,
  SubnetConfiguration,
  SubnetSelection
} from "aws-cdk-lib/lib/aws-ec2";
import { IGroup, PolicyStatement, Role, User } from "aws-cdk-lib/lib/aws-iam";
import { Construct } from "constructs";
import { ssmRoleProps } from "../resource/iam/role";
import { operateEc2Props, userProps } from "../resource/iam/user";
import { ec2Props } from "../resource/service/ec2";

interface ServiceProps extends StackProps {
  vpc: IVpc;
  subnet: SubnetSelection & SubnetConfiguration;
  securityGroup: {
    internal: ISecurityGroup;
    toInternet: ISecurityGroup;
  };
  userGroup: IGroup;
}

export class ServiceStack extends Stack {
  constructor(scope: Construct, id: string, props: ServiceProps) {
    super(scope, id, props);
    const ec2 = new Instance(
      this,
      "ubuntu",
      ec2Props(
        props.vpc,
        props.subnet,
        props.securityGroup.internal,
        new Role(this, "ssmRole", ssmRoleProps())
      )
    );
    ec2.addSecurityGroup(props.securityGroup.toInternet);
    new User(this, "user", userProps("mineco13", [props.userGroup])).addToPolicy(
      new PolicyStatement(operateEc2Props(ec2))
    );
  }
}
