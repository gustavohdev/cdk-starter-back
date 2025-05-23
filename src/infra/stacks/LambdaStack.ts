import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Runtime, Tracing } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { join } from 'path';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';

interface LambdaStackProps extends StackProps {
  spacesTable: ITable;
}

export class LambdaStack extends Stack {
  public readonly spacesLambdaIntegration: LambdaIntegration;

  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props);

    const spacesLambda = new NodejsFunction(this, 'HelloLambda', {
      runtime: Runtime.NODEJS_18_X,
      handler: 'handler',
      entry: join(__dirname, '..', '..', 'services', 'spaces', 'handler.ts'),
      environment: {
        TABLE_NAME: props.spacesTable.tableName,
      },
      tracing: Tracing.ACTIVE,
      timeout: Duration.seconds(30),
    });

    spacesLambda.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        resources: [props.spacesTable.tableArn],
        actions: [
          'dynamodb:PutItem',
          'dynamodb:Scan',
          'dynamodb:GetItem',
          'dynamodb:UpdateItem',
          'dynamodb:DeleteItem',
        ],
      }),
    );

    this.spacesLambdaIntegration = new LambdaIntegration(spacesLambda);
  }
}
