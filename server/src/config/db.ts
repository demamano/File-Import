import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('fileimport', 'root', '#Humanity1', {
  host: 'localhost',
  dialect: 'mysql',
});



export default sequelize;
// import { Sequelize } from 'sequelize';
// import  Item  from '../models/fileModel';

// const sequelize = new Sequelize('database', 'username', 'password', {
//   host: 'localhost',
//   dialect: 'mysql',
// });

// interface IDb {
//   Sequelize: any;
//   sequelize: Sequelize;
//   Item: Item;
// }

// const db: IDb = {
//   Sequelize,
//   sequelize,
//   Item: require('../models/fileModel')(sequelize, Sequelize),
// };

// export default db;