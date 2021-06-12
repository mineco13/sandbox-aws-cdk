import { Stack } from "aws-cdk-lib";
import { Group, IGroup } from "aws-cdk-lib/lib/aws-iam";
import { Construct } from "constructs";
import { readonlyProps } from "../resource/iam/group";


export class UserGroupStack extends Stack {
    readonly userGroup: IGroup
    constructor(scope: Construct, id: string) {
        super(scope, id);
        this.userGroup = new Group(this, "readonly", readonlyProps());
    }
}
