import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from "aws-lambda";


async function handler (event: APIGatewayProxyEvent, context: Context):Promise<APIGatewayProxyResult> {

    let message: string

    switch(event.httpMethod){
        case 'GET':
            message = 'HEllo from get'
            break;

        case 'POST':
            message = 'HEllo from POST'
            break;
        
        default:
            break;
    }

    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify(message)
    }
    console.log(event)

    return response
}

export { handler }