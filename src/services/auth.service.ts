import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

  constructor(private httpService: HttpService) {
  }

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google'
    }

    return {
      message: 'User information from google',
      user: req.user
    }
  }

  azureLogin(req) {
    if (!req.data) {
      return 'No user from azure'
    }
    return {
      message: 'User information from Azure',
      user: req.data
    }
  }

  orcidAuthCode(res){
    const url = 'https://sandbox.orcid.org/oauth/authorize?client_id=APP-T1T4CU7O1XO6KULF&response_type=code&scope=/authenticate&redirect_uri=http://127.0.0.1:3000/auth/orcid';
    return res.redirect(url);
  }

  orcidAuthUserData(code){
    if (code !== null){
      const url = 'https://sandbox.orcid.org/oauth/token';
      const data = 'client_id=APP-T1T4CU7O1XO6KULF&client_secret=b40fb38a-5aed-4929-b38a-4ec377b2dbcd&grant_type=authorization_code&redirect_uri=http://127.0.0.1:3000/auth/orcid&code=' + code;
      return this.httpService.post(url, data, {
        headers: {
          'Accept': 'application/json',
        },
      });
    } else {
      return null;
    }
  }

}
