import { Duration } from "aws-cdk-lib";
import { IRole } from "aws-cdk-lib/lib/aws-iam";
import { Code, FunctionProps, Runtime } from "aws-cdk-lib/lib/aws-lambda";

export function lambdaProps(role: IRole): FunctionProps {
    return {
        functionName: "stopAllEc2",
        code: Code.fromAsset("./lib/resource/service/code/"),
        runtime: Runtime.PYTHON_3_8,
        handler: "stop.lambda_handler",
        timeout: Duration.seconds(15),
        role: role
    }
}
