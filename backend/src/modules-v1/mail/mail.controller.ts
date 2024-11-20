import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';
import { ResponseMessage } from 'src/common/decorators/responseMessage';
import { MailerService } from '@nestjs-modules/mailer';
import { Public } from 'src/common/decorators/public';
import { ConfigService } from '@nestjs/config';

@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private readonly mailerService: MailerService,
  ) {}

  @Get()
  @Public()
  @ResponseMessage('Test email')
  async handleTestEmail() {
    await this.mailerService.sendMail({
      to: 'khoanguyen03012001@gmail.com',
      from: '"Support team"<support@example.com>',
      subject: 'Welcome to nice App! Confirm your email',
      template: 'test',
    });
  }
}
