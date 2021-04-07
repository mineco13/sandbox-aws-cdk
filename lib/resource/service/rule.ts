import { RuleProps, Schedule } from "aws-cdk-lib/lib/aws-events";

export function eodRule(): RuleProps {
    return { schedule: Schedule.cron({ hour: "17" }) }
}