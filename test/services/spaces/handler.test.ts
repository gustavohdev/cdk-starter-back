// 👇 TOP OF FILE — mock first!
jest.mock('@aws-sdk/client-dynamodb', () => {
  const actual = jest.requireActual('@aws-sdk/client-dynamodb');
  return {
    ...actual,
    DynamoDBClient: jest.fn(),
    ScanCommand: jest.fn(),
  };
});

jest.mock('aws-xray-sdk-core', () => ({
  captureAWSv3Client: (client: any) => client,
  getSegment: () => ({
    addNewSubsegment: () => ({
      close: jest.fn(),
    }),
  }),
}));

// 👇 THEN import everything else
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { handler } from '../../../src/services/spaces/handler';

// 👇 Mock values and setup
const someItems = [
  {
    id: { S: '123' },
    location: { S: 'Paris' },
  },
];

describe('Spaces handler test suite', () => {
  beforeEach(() => {
    // Reset mocks between tests
    jest.clearAllMocks();

    // @ts-ignore
    DynamoDBClient.mockImplementation(() => ({
      send: jest.fn().mockResolvedValue({ Items: someItems }),
    }));
  });

  test('Returns spaces from dynamoDb', async () => {
    const result = await handler({ httpMethod: 'GET' } as any, {} as any);

    expect(result.statusCode).toBe(201);
    const expectedResult = [{ id: '123', location: 'Paris' }];
    const parsedResultBody = JSON.parse(result.body);
    expect(parsedResultBody).toEqual(expectedResult);
  });
});
