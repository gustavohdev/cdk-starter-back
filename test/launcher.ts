import { handler } from "../src/services/spaces/handler";

process.env.AWS_REGION = "us-east-1"
process.env.TABLE_NAME = "SpacesTable-0affca74a325"

handler({
    httpMethod: "POST",
    body:JSON.stringify({
        location: "LONDON DEBUG"
    })
} as any, {} as any);