import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { IBucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, CacheControl, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";
import { existsSync } from "fs";
import { join } from "path";

interface UiDeploymentStackProps extends StackProps {
    deploymentBucket: IBucket;
}

export class UiDeploymentStack extends Stack {

    constructor(scope: Construct, id: string, props: UiDeploymentStackProps) {
        super(scope, id, props);

        const uiDir = join(__dirname, '..', '..', '..', '..', 'cdk-starter-frontend', 'dist');

        if (existsSync(uiDir)) {
            new BucketDeployment(this, 'space-finder-ui-deployment', {
                destinationBucket: props.deploymentBucket,
                sources: [
                    Source.asset(uiDir)
                ],
                prune: true, // Removes files from the bucket that are no longer in the dist/ folder
                cacheControl: [CacheControl.noCache(), CacheControl.noStore()] // Optional: disable caching for fresh deployment
            })

            new CfnOutput(this, 'space-finder-ui-deploymentS3Url', {
                value: props.deploymentBucket.bucketWebsiteUrl
            })
        } else {
            console.warn('Ui directory not found: ' + uiDir)
        }

    }
}