import { Delete, Get, Injectable, Patch } from "@nestjs/common";
import { CreateBookmarkDto, EditBookmarkDto } from "./dto";

@Injectable()
export class BookmarkService {
  createBookmark(userId: string, dto: CreateBookmarkDto) {}

  getBookmarks(userId: string) {}

  getBookmarkById(userId: string, bookmarkId: string) {}

  editBookmarkById(userId: string, bookmarkId: string, dto: EditBookmarkDto) {}

  deleteBookmarkById(userId: string, bookmarkId: string) {}
}
