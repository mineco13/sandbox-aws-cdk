import { SubnetConfiguration, SubnetType } from 'aws-cdk-lib/lib/aws-ec2';


export function vpcProps(subnetConfigurations: SubnetConfiguration[]) {
    return {
        cidr: "10.0.0.0/16",
        natGateways: 0,
        subnetConfiguration: subnetConfigurations
    }
}


export function subnetConfig(type: SubnetType) {
    return {
        cidrMask: 18, subnetType: type, name: type
    }
}

