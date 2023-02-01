import { ForbiddenException, Injectable } from "@nestjs/common";
import { CreateBookmarkDto, EditBookmarkDto } from "./dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class BookmarkService {
  constructor(private prismaService: PrismaService) {}

  async createBookmark(userId: string, dto: CreateBookmarkDto) {
    const bookmark = await this.prismaService.bookmark.create({
      data: {
        userId,
        ...dto,
      },
    });

    return bookmark;
  }

  getBookmarks(userId: string) {
    return this.prismaService.bookmark.findMany({
      where: {
        userId,
      }
    });
  }

  getBookmarkById(userId: string, bookmarkId: string) {
    return this.prismaService.bookmark.findFirst({
      where: {
        id: bookmarkId,
        userId,
      }
    });
  }

  async editBookmarkById(
    userId: string,
    bookmarkId: string,
    dto: EditBookmarkDto
  ) {
    // get the bookmark by id
    const bookmark = await this.prismaService.bookmark.findUnique({
      where: {
        id: bookmarkId,
      }
    })

    // check if user owns the bookmark
    if (!bookmark || bookmark.userId !== userId )
      throw new ForbiddenException(
        'Access to resources denied',
      );

    return this.prismaService.bookmark.update({
      where: {
        id: bookmarkId
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteBookmarkById(userId: string, bookmarkId: string) {
    const bookmark = await this.prismaService.bookmark.findUnique({
      where: {
        id: bookmarkId,
      }
    })

    // check if user owns the bookmark
    if (!bookmark || bookmark.userId !== userId )
      throw new ForbiddenException(
        'Access to resources denied',
      );

    await this.prismaService.bookmark.delete({
      where: {
        id: bookmarkId,
      }
    });
  }
}
