import { ManagedPolicy, RoleProps, ServicePrincipal } from "aws-cdk-lib/lib/aws-iam"

export function ssmRoleProps(): RoleProps {
    return {
        roleName: "SSMRole",
        assumedBy: new ServicePrincipal("ec2.amazonaws.com"),
        managedPolicies: [ManagedPolicy.fromAwsManagedPolicyName("service-role/AmazonEC2RoleforSSM")]
    }
}
