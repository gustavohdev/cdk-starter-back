import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";
import { AuthService } from "./AuthService";


async function testAuth() {
    const service = new AuthService();
    const loginResult = await service.login('gustavo', 'Gh180493$10');
    const idToken = await service.getIdToken();
    

    console.log(idToken)
    const credentials = await service.generateTemporaryCredentials();
    const buckets = await listBuckets(credentials);
    console.log(buckets);
}

async function listBuckets(credentials) {
    const client = new S3Client({
        credentials: credentials,
        region: 'us-east-1',
    });
    const command = new ListBucketsCommand({});
    const result = await client.send(command);
    return result;
}

testAuth();