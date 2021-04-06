import { IVpc, Peer, Port, SecurityGroup, SecurityGroupProps } from "aws-cdk-lib/lib/aws-ec2"


export function sgInternal(securityGroup: (props: SecurityGroupProps) => SecurityGroup, vpc: IVpc) {
    const internal = securityGroup({ securityGroupName: "internal", vpc: vpc, allowAllOutbound: false })
    internal.addIngressRule(internal, Port.allTraffic())
    internal.addEgressRule(internal, Port.allTraffic())
    return internal
}
export function sgToInternet(vpc: IVpc) {
    return { securityGroupName: "to-internet", vpc: vpc, allowAllOutbound: true }
}
export function sgFromInternet(securityGroup: (props: SecurityGroupProps) => SecurityGroup, vpc: IVpc) {
    const fromInternet = securityGroup({ securityGroupName: "from-internet", vpc: vpc, allowAllOutbound: false })
    fromInternet.addIngressRule(Peer.anyIpv4(), Port.tcp(443))
    return fromInternet
}