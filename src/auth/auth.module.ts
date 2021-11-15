import { HttpModule, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import {GoogleStrategy} from './google.strategy';
import { AzureStrategy } from './azure.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [HttpModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, AzureStrategy]
})

export class AuthModule {}
