import os
import boto3

def stop():
    client = boto3.client('ec2')
    response = client.describe_instances()['Reservations'][0]['Instances']
    client.stop_instances(
        InstanceIds=list(map(lambda instance:instance['InstanceId'],response))
    )

def lambda_handler(event, context):
    stop()
