import {Sequelize} from 'sequelize';
const sequelize =  new Sequelize(process.env.DB_CONNECTION,{
    dialect : 'mysql',
    define:{
        timestamps: false
    }
});

export default sequelize;
