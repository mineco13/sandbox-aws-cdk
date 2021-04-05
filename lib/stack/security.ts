import { Stack, StackProps } from 'aws-cdk-lib';
import { IVpc, Port, SecurityGroup, SecurityGroupProps, SubnetType, Vpc } from 'aws-cdk-lib/lib/aws-ec2';
import { Construct } from 'constructs';
import { sgInternal, sgToInternet } from '../resource/security/security_group';


interface SecurityProps extends StackProps {
  vpc: IVpc
}
export class SecurityStack extends Stack {
  constructor(scope: Construct, id: string, props: SecurityProps) {
    super(scope, id, props);
    sgInternal((props: SecurityGroupProps) => new SecurityGroup(this, "internal", props), props.vpc)
    sgToInternet(props.vpc)
  }
}
