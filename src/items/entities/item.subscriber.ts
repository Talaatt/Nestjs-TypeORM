import { DataSource, EntitySubscriberInterface, EventSubscriber, InsertEvent } from "typeorm";
import { Item } from "./item.entity";
import { Logger } from "@nestjs/common";

@EventSubscriber()
export class ItemSubscriber implements EntitySubscriberInterface<Item> {
    private readonly logger = new Logger(ItemSubscriber.name);
    constructor(datasource:DataSource) {
        datasource .subscribers.push(this);
 }
    listenTo() {
        return Item; 
}
 beforeInsert(event: InsertEvent<Item>): void | Promise<any> {
    this.logger.log(`Before insert`, JSON.stringify(event.entity));
}
afterInsert(event: InsertEvent<Item>): void | Promise<any> {
    this.logger.log(`After insert`, JSON.stringify(event.entity));
}
}