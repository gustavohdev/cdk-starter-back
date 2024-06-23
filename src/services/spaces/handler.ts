import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from "aws-lambda";
import { postSpaces } from "./PostSpaces";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { getSpaces } from "./GetSpaces";

const ddbClient = new DynamoDBClient({})

async function handler (event: APIGatewayProxyEvent, context: Context):Promise<APIGatewayProxyResult> {

    let message: string
    
    try{
        switch(event.httpMethod){
            case 'GET':
                const getResponse = getSpaces(event, ddbClient)
                console.log( await getResponse)
                return getResponse
                break;
    
            case 'POST':
                const postResponse = postSpaces(event, ddbClient)
                return postResponse
            default:
                break;
                
        }

    }catch(error){
        console.error(error)
        return {
            statusCode: 500,
            body:JSON.stringify(error.message)
        }
    }


    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify(message)
    }
    console.log(event)

    return response
}

export { handler }