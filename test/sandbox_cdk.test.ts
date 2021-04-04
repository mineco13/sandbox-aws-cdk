import * as cdk from 'aws-cdk-lib';
import * as SandboxCdk from '../lib/sandbox_cdk-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new SandboxCdk.SandboxCdkStack(app, 'MyTestStack');
    // THEN
    const actual = app.synth().getStackArtifact(stack.artifactId).template;
    expect(actual).toEqual({});
});
