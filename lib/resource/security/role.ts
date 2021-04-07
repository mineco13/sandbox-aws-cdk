import { ManagedPolicy, RoleProps, ServicePrincipal } from "aws-cdk-lib/lib/aws-iam"

export function ssmRoleProps(): RoleProps {
    return {
        roleName: "ec2Ssm",
        assumedBy: new ServicePrincipal("ec2.amazonaws.com"),
        managedPolicies: [ManagedPolicy.fromAwsManagedPolicyName("service-role/AmazonEC2RoleforSSM")]
    }
}

export function stopEc2RoleProps(): RoleProps {
    return {
        roleName: "ec2Lambda",
        assumedBy: new ServicePrincipal("lambda.amazonaws.com"),
        managedPolicies: [ManagedPolicy.fromAwsManagedPolicyName("AmazonEC2FullAccess")]
    }
}
