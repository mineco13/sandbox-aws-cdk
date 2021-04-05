import { Stack, StackProps } from 'aws-cdk-lib';
import { IVpc, Port, SecurityGroup, SubnetConfiguration, SubnetType, Vpc } from 'aws-cdk-lib/lib/aws-ec2';
import { Construct } from 'constructs';


export function vpcProps(subnetConfigurations: SubnetConfiguration[]) {
    return {
        cidr: "10.0.0.0/16",
        natGateways: 0,
        subnetConfiguration: subnetConfigurations
    }
}

export function subnetConfigurations() {
    return [SubnetType.ISOLATED, SubnetType.PUBLIC].map(type => subnetConfig(type))
}

function subnetConfig(type: SubnetType) {
    return {
        cidrMask: 18, subnetType: type, name: type
    }
}

