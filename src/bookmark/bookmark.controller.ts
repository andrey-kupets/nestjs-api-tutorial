import {
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
import { GetUser } from "../auth/dto/decorator";

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(
    private bookmarkService: BookmarkService,
  ) {}

  @Post()
  createBookmark(@GetUser('id') userId: string) {}

  @Get()
  getBookmarks(@GetUser('id') userId: string) {}

  @Get()
  getBookmarkById(
    @GetUser('id') userId: string,
    @Param('id', ParseIntPipe) bookmarkId: string,
  ) {}

  @Patch()
  editBookmarkById(@GetUser('id') userId: string) {}

  @Delete()
  deleteBookmarkById(@GetUser('id') userId: string) {}
}
