import { Controller, Get } from '@nestjs/common';
import { TestDbService } from './test-db.service';

@Controller('test-db')
export class TestDbController {
  constructor(private readonly testDbService: TestDbService) {}

  @Get()
  findAll() {
    return this.testDbService.findAll();
  }
}