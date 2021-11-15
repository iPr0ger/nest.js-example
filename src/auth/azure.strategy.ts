import { Injectable } from '@nestjs/common';
import { PassportStrategy, AuthGuard } from '@nestjs/passport';
import { BearerStrategy } from 'passport-azure-ad';

const clientID = '1ece9d8d-0c44-477a-acef-299fd4bc4853';
const tenantID = 'b0abbb3f-dc30-4e00-bdd8-d5755c9aafd1';


@Injectable()
export class AzureStrategy extends PassportStrategy(
  BearerStrategy,
  'azure-ad',
) {
  constructor() {
    super({
      identityMetadata: `https://login.microsoftonline.com/${tenantID}/v2.0/.well-known/openid-configuration`,
      clientID,
    });
  }

  async validate(data) {
    return data;
  }
}

export const AzureGuard = AuthGuard('azure');
