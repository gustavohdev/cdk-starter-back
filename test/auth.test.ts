import { AuthService } from "./AuthService";


async function testAuth() {
    const service = new AuthService();
    const loginResult = await service.login('gustavo', 'Gh180493$10');
    const idToken = await service.getIdToken();
    

    // console.log(loginResult.getSignInUserSession().getIdToken().getJwtToken());
    console.log(idToken)
    
}

testAuth();