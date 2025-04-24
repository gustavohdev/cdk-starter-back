import { Amplify } from 'aws-amplify';
import { SignInOutput, fetchAuthSession, signIn } from '@aws-amplify/auth';

const awsRegion = 'us-east-1';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_f5fb8wUYO',
      userPoolClientId: '1hfmr93vi5l2hekbgvbbh7hhl6',
    },
  },
});

export class AuthService {

  public async login(userName: string, password: string) {
      const signInOutput: SignInOutput = await signIn({
          username: userName,
          password: password,
          options: {
              authFlowType: 'USER_PASSWORD_AUTH'
          }
      });
      return signInOutput;
  }

  /**
   * call only after login
   */
  public async getIdToken(){
      const authSession = await fetchAuthSession();
      return authSession.tokens?.idToken?.toString();

  }

}
