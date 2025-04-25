import * as cdk from 'aws-cdk-lib';
import { AttributeType, ITable, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import { getSuffixFromStack } from '../Utils';
import { Bucket, IBucket, HttpMethods, CorsRule, BucketAccessControl } from 'aws-cdk-lib/aws-s3';
import { Distribution, OriginAccessIdentity, AllowedMethods } from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { ArnPrincipal, PolicyStatement } from 'aws-cdk-lib/aws-iam';

export class DataStack extends cdk.Stack {

  public readonly spacesTable: ITable;
  public readonly deploymentBucket: IBucket;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const suffix = getSuffixFromStack(this);
    const s3CorsRule: CorsRule = {
      allowedMethods: [HttpMethods.GET, HttpMethods.HEAD],
      allowedOrigins: ['*'],
      allowedHeaders: ['*'],
      maxAge: 300,
    };
    
    this.deploymentBucket = new Bucket(this, 'SpaceFinderFrontend', {
      bucketName: `space-finder-frontend-${suffix}`,
      blockPublicAccess: cdk.aws_s3.BlockPublicAccess.BLOCK_ALL,
      accessControl: BucketAccessControl.PRIVATE,
      cors: [s3CorsRule],
    });

    const oai = new OriginAccessIdentity(this, 'OAI');
    this.deploymentBucket.grantRead(oai);

    const backendCloudfront = new Distribution(this, 'BackendCF', {
      defaultBehavior: {
        origin: new S3Origin(this.deploymentBucket, {
          originAccessIdentity: oai,
        }),
        allowedMethods: AllowedMethods.ALLOW_GET_HEAD,
      },
      defaultRootObject: 'index.html', // 👈 This line is crucial!
    });

    this.spacesTable = new Table(this, 'SpacesTable', {
      partitionKey: {
        name: 'id',
        type: AttributeType.STRING,
      },
      tableName: `SpacesTable-${suffix}`,
    });
  }
}
