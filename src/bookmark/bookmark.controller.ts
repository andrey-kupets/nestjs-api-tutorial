import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards
} from "@nestjs/common";
import { JwtGuard } from "../auth/guard";
import { BookmarkService } from "./bookmark.service";
import { GetUser } from "../auth/dto";
import { CreateBookmarkDto, EditBookmarkDto } from "./dto";

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(
    private bookmarkService: BookmarkService,
  ) {}

  @Post()
  createBookmark(
    @GetUser('id') userId: string,
    @Body() dto: CreateBookmarkDto,
  ) {}

  @Get()
  getBookmarks(@GetUser('id') userId: string) {}

  @Get(':id')
  getBookmarkById(
    @GetUser('id') userId: string,
    @Param('id',
      // ParseIntPipe
    ) bookmarkId: string,
  ) {}

  @Patch()
  editBookmarkById(
    @GetUser('id') userId: string,
    @Body() dto: EditBookmarkDto,
  ) {}

  @Delete(':id')
  deleteBookmarkById(
    @GetUser('id') userId: string,
    @Param('id',
      // ParseIntPipe
    ) bookmarkId: string,
  ) {}
}
