import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Rule, Schedule } from 'aws-cdk-lib/lib/aws-events';
import { LambdaFunction } from 'aws-cdk-lib/lib/aws-events-targets';
import { IRole, ManagedPolicy, Role, RoleProps, ServicePrincipal } from 'aws-cdk-lib/lib/aws-iam';
import { Code, Function, FunctionProps, Handler, Runtime } from 'aws-cdk-lib/lib/aws-lambda';
import { Construct } from 'constructs';
import { stopEc2RoleProps as rolePropsStopEc2 } from '../resource/security/role';
import { lambdaProps as lambdaPropsStopEc2 } from '../resource/service/lambda';
import { eodRule } from '../resource/service/rule';


export class SaveCostStack extends Stack {
    constructor(scope: Construct, id: string) {
        super(scope, id);
        const roleExecuteLambda = new Role(this, "stopEc2Role", rolePropsStopEc2())
        const lambda = new Function(this, "lambda", lambdaPropsStopEc2(roleExecuteLambda))
        new Rule(this, "eod", eodRule()).addTarget(new LambdaFunction(lambda))
    }
}
