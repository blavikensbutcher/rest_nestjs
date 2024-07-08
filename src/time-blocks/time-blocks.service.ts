import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';

@Injectable()
export class TimeBlocksService {
  constructor(private readonly dbService: DbService) {}

  async getAll(userId: string) {

  }
}
