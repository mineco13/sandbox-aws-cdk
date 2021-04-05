import { Stack, StackProps } from 'aws-cdk-lib';
import { IVpc, Port, SecurityGroup, SubnetType, Vpc } from 'aws-cdk-lib/lib/aws-ec2';
import { Construct } from 'constructs';
import { subnetConfigurations, vpcProps } from '../network/vpc';

export class NetworkStack extends Stack {
    readonly vpc: Vpc
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);
        this.vpc = new Vpc(this, "vpc", vpcProps(subnetConfigurations()))
    }
}
