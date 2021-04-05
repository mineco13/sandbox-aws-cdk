import { Stack, StackProps } from 'aws-cdk-lib';
import { Instance, ISecurityGroup, IVpc, Port, SecurityGroup, SecurityGroupProps, SubnetConfiguration, SubnetSelection, SubnetType, Vpc } from 'aws-cdk-lib/lib/aws-ec2';
import { IRole } from 'aws-cdk-lib/lib/aws-iam';
import { Construct } from 'constructs';
import { ec2Props } from '../resource/service/ec2';


interface ServiceProps extends StackProps {
    vpc: IVpc,
    subnet: SubnetSelection & SubnetConfiguration
    securityGroup: {
        internal: ISecurityGroup,
        toInternet: ISecurityGroup
    }
    role: { ssm: IRole }
}
export class ServiceStack extends Stack {
    constructor(scope: Construct, id: string, props: ServiceProps) {
        super(scope, id, props);
        new Instance(this, "ubuntu", ec2Props(props.vpc, props.subnet, props.securityGroup.internal, props.role.ssm))
            .addSecurityGroup(props.securityGroup.toInternet)
    }
}
