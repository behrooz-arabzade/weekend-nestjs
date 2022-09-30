module.exports = {
  host: 'abul.db.elephantsql.com',
  type: 'postgres',
  port: '5432',
  username: 'mradutrm',
  password: 'Hnn7cb2tFj-yz3ZmyiXeT-wqoCVk9pu5',
  database: 'mradutrm',
  seeds: ['src/database/seeds/**/*{.ts,.js}'],
  factories: ['src/database/factories/**/*{.ts,.js}'],
  entities: ['src/entities/**/*.entity.ts'],
};
