import { Stack, StackProps } from 'aws-cdk-lib';
import { IVpc, SecurityGroup, SecurityGroupProps } from 'aws-cdk-lib/lib/aws-ec2';
import { IRole, Role } from 'aws-cdk-lib/lib/aws-iam';
import { Construct } from 'constructs';
import { ssmRoleProps } from '../resource/security/role';
import { sgInternal, sgToInternet } from '../resource/security/security_group';


interface SecurityProps extends StackProps {
  vpc: IVpc
}
export class SecurityStack extends Stack {
  readonly securityGroup: {
    readonly internal: SecurityGroup,
    readonly toInternet: SecurityGroup,
  }
  readonly role: {
    readonly ssm: IRole
  }
  constructor(scope: Construct, id: string, props: SecurityProps) {
    super(scope, id, props);
    this.securityGroup = {
      internal: sgInternal((props: SecurityGroupProps) => new SecurityGroup(this, "internal", props), props.vpc),
      toInternet: new SecurityGroup(this, "to-internet", sgToInternet(props.vpc))
    }
    this.role = {
      ssm: new Role(this, "ssmRole", ssmRoleProps())
    }
  }
}
