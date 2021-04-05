import { Stack, StackProps } from 'aws-cdk-lib';
import { SubnetConfiguration, SubnetSelection, SubnetType, Vpc } from 'aws-cdk-lib/lib/aws-ec2';
import { Construct } from 'constructs';
import { subnetConfig, vpcProps } from '../resource/network/vpc';

export class NetworkStack extends Stack {
    readonly vpc: Vpc
    readonly subnet: {
        isolated: SubnetConfiguration & SubnetSelection,
        public: SubnetConfiguration & SubnetSelection
    }
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);
        this.subnet = {
            isolated: subnetConfig(SubnetType.ISOLATED),
            public: subnetConfig(SubnetType.PUBLIC),
        }
        this.vpc = new Vpc(this, "vpc", vpcProps([this.subnet.isolated, this.subnet.public]))
    }
}
