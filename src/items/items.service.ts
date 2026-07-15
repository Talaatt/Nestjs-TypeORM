import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { EntityManager, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';

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
        },
        });
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return item;
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const item = await this.findOne(id);
    item.public = updateItemDto.public;
    await this.itemsRepository.save(item);
    return item;

  }

  async remove(id: number) {
    const item = await this.findOne(id);
    await this.itemsRepository.remove(item);
  }
}
