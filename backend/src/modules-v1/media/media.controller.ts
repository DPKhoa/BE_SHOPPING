import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { ResponseMessage } from 'src/common/decorators/responseMessage';
import { FilesInterceptor } from '@nestjs/platform-express';
import { GetParamsMediaDto } from './dto/get-media.dto';
import { User } from 'src/common/decorators/public';
import { IUser } from 'src/interfaces/common.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('media')
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  @ResponseMessage('Upload hình thành công')
  @UseInterceptors(FilesInterceptor('image'))
  create(@UploadedFiles() images: Express.Multer.File[], @User() user: IUser) {
    return this.mediaService.create(images, user);
  }

  @Get()
  findAll(@Query() qs: GetParamsMediaDto) {
    return this.mediaService.findAll(qs);
  }

  @Delete()
  moveToTrash(@Body('ids') ids: number[], @User() user: IUser) {
    return this.mediaService.moveToTrash(ids, user);
  }

  @Post('restore')
  restore(@Body('ids') ids: number[], @User() user: IUser) {
    return this.mediaService.restore(ids, user);
  }

  @Delete('emptyTrash')
  emptyTrash(@Body('ids') ids: number[]) {
    return this.mediaService.emptyTrash(ids);
  }
  @Delete('emptyTrashAll')
  emptyTrashAll() {
    return this.mediaService.emptyTrashAll();
  }
}
