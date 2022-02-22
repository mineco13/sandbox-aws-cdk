import { Stack, StackProps } from 'aws-cdk-lib';
import { IVpc, SecurityGroup, SecurityGroupProps } from 'aws-cdk-lib/lib/aws-ec2';
import { Group, IGroup, IRole, Role } from "aws-cdk-lib/lib/aws-iam";
import { Construct } from 'constructs';
import { readonlyProps } from "../resource/iam/group";
import { ssmRoleProps } from "../resource/iam/role";
import { sgFromInternet, sgInternal, sgToInternet } from '../resource/security/security_group';


interface SecurityProps extends StackProps {
  vpc: IVpc
}
export class SecurityStack extends Stack {
  readonly securityGroup: {
    readonly internal: SecurityGroup,
    readonly toInternet: SecurityGroup,
    readonly fromInternet: SecurityGroup,
  }
  readonly userGroup: IGroup
  readonly ssmRole: IRole

  constructor(scope: Construct, id: string, props: SecurityProps) {
    super(scope, id, props);
    this.securityGroup = {
      internal: sgInternal((props: SecurityGroupProps) => new SecurityGroup(this, "internal", props), props.vpc),
      toInternet: new SecurityGroup(this, "to-internet", sgToInternet(props.vpc)),
      fromInternet: sgFromInternet((props: SecurityGroupProps) => new SecurityGroup(this, "from-internet", props), props.vpc),
    }
    this.userGroup = new Group(this, "readonly", readonlyProps());
    this.ssmRole = new Role(this, "ssmRole", ssmRoleProps())

  }

}
