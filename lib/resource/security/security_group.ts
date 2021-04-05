import { ISecurityGroup, IVpc, Port, SecurityGroup, SecurityGroupProps } from "aws-cdk-lib/lib/aws-ec2"


export function sgInternal(securityGroup: (props: SecurityGroupProps) => ISecurityGroup, vpc: IVpc) {
    const internal = securityGroup({ securityGroupName: "internal", vpc: vpc })
    internal.addIngressRule(internal, Port.allTraffic())
    internal.addEgressRule(internal, Port.allTraffic())
    return internal
}
export function sgToInternet(vpc: IVpc) {
    return { securityGroupName: "to-internet", vpc: vpc, allowAllOutbound: true }
}
