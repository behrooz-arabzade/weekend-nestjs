import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class Main implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    // TODO call all factories
    // await connection
    //   .createQueryBuilder()
    //   .insert()
    //   .into(User)
    //   .values([
    //     { firstName: 'Timber', lastName: 'Saw' },
    //     { firstName: 'Phantom', lastName: 'Lancer' },
    //   ])
    //   .execute()
    // await factory(Pet)().createMany(10)
  }
}
