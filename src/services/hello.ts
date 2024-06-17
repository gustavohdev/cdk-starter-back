import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from "aws-lambda";
import { v4 } from "uuid";

async function handler (event: APIGatewayProxyEvent, context: Context) {
    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body:JSON.stringify("Hello from lambda, this is my id: " + v4())
    }
    console.log(event)

    return response
}

export { handler }