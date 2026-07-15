import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  ConfigService } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory :(configservice: ConfigService) => ({
                type: 'postgres',
                    url: configservice.get<string>('DATABASE_URL'),
                    autoLoadEntities: true,
                    synchronize: true,
                    logging: true,
                   // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                    
            }),
          inject: [ConfigService],    
        }),
    ],
})

export class DatabaseModule {}
