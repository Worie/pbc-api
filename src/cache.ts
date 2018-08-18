import * as Redis from 'redis';

const {
  REDIS_PORT,
  REDIS_PASSWORD,
  REDIS_HOST,
} = process.env;

const config = {
  host: REDIS_HOST,
  port: REDIS_PORT,
  password: REDIS_PASSWORD,
};

const NAMESPACE = '0dbd7b60-8dc8-11e8-9eb6-529269fb1459';

export default class Cache {
  private name: string;
  private config: Redis.ClientOpts;
  private client: Redis.RedisClient;

  constructor (name: string, config: Partial<Redis.ClientOpts> = {}) {
    this.name = name;
    
    this.config = {
      ...config,
      db: 0,
    }

    this.client = Redis.createClient(this.config);
  }

  public async delete(...args: string[]): Promise<any> {
    return this.promisify(this.client.del, ...args);
  }

  public async flush(): Promise<void> {
    this.promisify(this.client.FLUSHDB);
  }

  public async get(key: string): Promise<any> {
    const data: string = await this.promisify(this.client.get, key);
    return JSON.parse(data);
  }

  public async set(key: string, value: any, timeout: number = 1000): Promise<void> {
    const stringValue: string = JSON.stringify(value);

    const response: string = await this.promisify(this.client.set, key, stringValue);
    
    if (response === 'OK') {
      await this.expire(key, timeout);
    }
  }

  public async expire(key: string, timeout: number): Promise<void> {
    if (timeout <= 0) {
      await this.promisify(this.client.persist, key);
    } else {
      await this.promisify(this.client.expire, key, timeout);
    }
  }

  public flushAll(): void {
    this.client.FLUSHALL();
  }

  private promisify(cb: Function, ...args: any[]): Promise<any> {
    return new Promise((resolve) => {
      cb.call(this.client, ...args, (err: any, res: any) => {
        resolve(res);
      });
    });
  }
}