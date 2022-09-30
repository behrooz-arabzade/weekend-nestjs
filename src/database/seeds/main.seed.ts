import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import defaultCities from '../factories/jsons/cities.default.json';
import defaultPermissions from '../factories/jsons/permissions.default.json';
import defaultRoles from '../factories/jsons/roles.default.json';
import defaultTags from '../factories/jsons/tags.default.json';
import defaultPlaces from '../factories/jsons/places.default.json';
import defaultUsers from '../factories/jsons/users.default.json';
import { City } from '../../entities/city/city.entity';
import { Permission } from '../../entities/permission/permission.entity';
import { Role } from '../../entities/role/role.entity';
import { Tag } from '../../entities/tag/tag.entity';
import { Place } from '../../entities/place/place.entity';
import { User } from '../../entities/user/user.entity';

export default class Main implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(City)
      .values(defaultCities)
      .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(Permission)
      .values(defaultPermissions)
      .execute();

    defaultRoles.find((r) => r.title === 'admin').permissions = [
      defaultPermissions.find((p) => p.title === 'delete comments'),
    ];

    await connection
      .createQueryBuilder()
      .insert()
      .into(Role)
      .values(defaultRoles)
      .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(Tag)
      .values(defaultTags)
      .execute();

    defaultPlaces[0].currentCity = defaultCities[0];
    defaultPlaces[0].tags = [defaultTags.find((t) => t.name === 'billiards')];

    await connection
      .createQueryBuilder()
      .insert()
      .into(Place)
      .values(defaultPlaces)
      .execute();

    defaultUsers[0].role = defaultRoles.find((r) => r.title === 'admin');

    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(defaultUsers)
      .execute();
  }
}
