import { SNSEvent } from 'aws-lambda';

async function handler(event: SNSEvent, context) {
  for (const record of event.Records) {
    await fetch(process.env.WEBHOOK_URL, {
      method: 'POST',
      body: JSON.stringify({
        text: `Huston, we have a problem: ${record.Sns.Message}`,
      }),
    });
  }
}

export { handler };
