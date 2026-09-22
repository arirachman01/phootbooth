import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { FrameTemplatesModule } from './frame-templates/frame-templates.module';
import { LandingPhotosModule } from './landing-photos/landing-photos.module';
import { SettingModule } from './setting/setting.module';
// import { PhotoResultsModule } from './photo-results/photo-results.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    FrameTemplatesModule,
    LandingPhotosModule,
    SettingModule,
    // PhotoResultsModule,
  ],
})
export class AppModule {}
