import { handler } from "../src/services/spaces/handler";

process.env.AWS_REGION = "us-east-1"
process.env.TABLE_NAME = "SpacesTable-0affca74a325"

// handler({
//     httpMethod: "POST",
//     body:JSON.stringify({
//         location: "LONDONCRAZY 2"
//     })
// } as any, {} as any);

handler({
    httpMethod: "PUT",
    queryStringParameters:{
        id: 'b8b0198f-d7c6-42d3-bb6c-5a819cc48ad5' 
    },
    body: JSON.stringify({
        location: 'LONDONCRAZY novo'
    })
} as any, {} as any);

// handler({
//     httpMethod: "GET",
//     // body:JSON.stringify({
//     //     location: "LONDON DEBUG"
//     // })
// } as any, {} as any);

// handler({
//     httpMethod: "GET",
//     queryStringParameters:{
//         id:'088f4971-2f8f-43fc-a0b2-7a2294d499b4'
//     }
// } as any, {} as any);