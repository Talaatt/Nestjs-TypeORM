import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { EntityManager, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';
import { Tag } from './entities/tag.entinty';
@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
    private readonly entityManager: EntityManager)
     {}
  
    async create(createItemDto: CreateItemDto) {
    const item = this.entityManager.create(Item, createItemDto);
    return await this.entityManager.save(item);

  }

  async findAll() {
    return this.itemsRepository.find();
  }

  async findOne(id: number) {
    const item = await this.itemsRepository.findOne({
        where: { id },
        relations: {
        listing: true,
        comments: true,
        tags: true
        },
        });
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return item;
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    return this.entityManager.transaction(async (entityManager) => {
      const item = await entityManager.findOne(Item, { where: { id } });
      if (!item) {
        throw new NotFoundException(`Item ${id} not found`);
      }

      item.public = updateItemDto.public;

      const comments = updateItemDto.comment.map((createCommentDto) =>
        entityManager.create(Comment, createCommentDto),
      );
      item.comments = comments;

      await entityManager.save(item);
      throw new Error('Simulated error for testing transaction rollback');

      const tag = entityManager.create(Tag, {
        content: `${Math.random()}`,
      });
      await entityManager.save(tag);

      return item;
    });
  } 

  async remove(id: number) {
    const item = await this.findOne(id);
    await this.itemsRepository.remove(item);
  }
}
