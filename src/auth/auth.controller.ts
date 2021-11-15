import { Controller, Get, Post, Req, UseGuards, Res, HttpService } from '@nestjs/common';
import { Request, response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { AzureGuard } from './azure.strategy';


@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) {}

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req)
  }

  @Get('/azure')
  @UseGuards(AzureGuard)
  async azureAuth(@Req() req) {}

  @Get('/azure/redirect')
  @UseGuards(AzureGuard)
  async azureAuthRedirect(@Req() req) {
    return this.authService.azureLogin(req);
  }

  @Get('/orcid')
  orcidAuth(@Req() req: Request){
    this.authService.orcidAuthUserData(req.query['code'].toString()).subscribe((data) => {
      return data.data;
    });
  }

  @Get('/orcid/redirect')
  orcidAuthRedirect(@Res() res){
    return this.authService.orcidAuthCode(res);
  }


}
