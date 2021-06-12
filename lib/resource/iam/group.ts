import { GroupProps, ManagedPolicy } from 'aws-cdk-lib/lib/aws-iam';

export function readonlyProps(): GroupProps {
    return {
        groupName: "readonly-administrator",
        managedPolicies: [ManagedPolicy.fromAwsManagedPolicyName("ReadOnlyAccess")],
    }
}
