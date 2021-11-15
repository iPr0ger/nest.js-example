import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';


config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {

  constructor() {
    super({
      clientID: '333667765744-u35alt7mgb6ur6hj02k23pblk3f8o582.apps.googleusercontent.com',
      clientSecret: 'cknbq-88nAx0dJbq8IKyvF3i',
      callbackURL: 'http://localhost:3000/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { name, emails, photos } = profile
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken
    }
    done(null, user);
  }
}
