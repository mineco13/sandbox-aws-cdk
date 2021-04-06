import { Stack, StackProps } from 'aws-cdk-lib';
import { Instance, ISecurityGroup, IVpc, SubnetConfiguration, SubnetSelection } from 'aws-cdk-lib/lib/aws-ec2';
import { Role } from 'aws-cdk-lib/lib/aws-iam';
import { Construct } from 'constructs';
import { ssmRoleProps } from '../resource/security/role';
import { ec2Props } from '../resource/service/ec2';


interface ServiceProps extends StackProps {
    vpc: IVpc,
    subnet: SubnetSelection & SubnetConfiguration
    securityGroup: {
        internal: ISecurityGroup,
        toInternet: ISecurityGroup
    }
}
export class ServiceStack extends Stack {
    constructor(scope: Construct, id: string, props: ServiceProps) {
        super(scope, id, props);
        const ssmRole = new Role(this, "ssmRole", ssmRoleProps())
        new Instance(this, "ubuntu", ec2Props(props.vpc, props.subnet, props.securityGroup.internal, ssmRole))
            .addSecurityGroup(props.securityGroup.toInternet)
    }
}
