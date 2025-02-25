import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { createClient } from 'redis';
import { ConfigService } from '@nestjs/config';

// 声明为全局了
@Global()
@Module({
  providers: [
    RedisService,
    {
      provide: 'REDIS_CLIENT',

      async useFactory(configService: ConfigService) {
        const client = createClient({
          socket: {
            host: configService.get('redis_server_host'),
            port: configService.get('redis_server_port'),
          },
        });
        await client.connect();
        return client;
      },
      inject: [ConfigService], //注意这里要注入
    },
  ],
  exports: [RedisService],
})
export class RedisModule {}
