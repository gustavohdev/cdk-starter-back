import { handler } from '../src/services/spaces/handler';

process.env.AWS_REGION = 'us-east-1';
process.env.TABLE_NAME = 'SpacesTable-0affc0d36e9d';

// handler({
//     httpMethod: "POST",
//     body:JSON.stringify({
//         location: "LONDONCRAZY 2"
//     })
// } as any, {} as any);

// handler({
//     httpMethod: "POST",
//     body:JSON.stringify({
//         location: "LONDONCRAZY 2"
//     })
// } as any, {} as any).then((result) => {
//     console.log(result)
// })

// handler({
//     httpMethod: "DELETE",
//     queryStringParameters:{
//         id: 'b8b0198f-d7c6-42d3-bb6c-5a819cc48ad5'
//     }
// } as any, {} as any);

// handler({
//     httpMethod: "PUT",
//     queryStringParameters:{
//         id: 'b8b0198f-d7c6-42d3-bb6c-5a819cc48ad5'
//     },
//     body: JSON.stringify({
//         location: 'LONDONCRAZY novo'
//     })
// } as any, {} as any);

// handler({
//     httpMethod: "GET",
//     // body:JSON.stringify({
//     //     location: "LONDON DEBUG"
//     // })
// } as any, {} as any);

// handler({
//     httpMethod: "GET",
//     queryStringParameters:{
//         id:'b8b0198f-d7c6-42d3-bb6c-5a819cc48ad5'
//     }
// } as any, {} as any);
