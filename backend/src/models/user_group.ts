import {
    Sequelize,
    Model,
    DataTypes,
    Optional,
  } from "sequelize";
import sequelize from '../dbconfig';


interface UserGroupAttributes {
    id: number;
    name : string;
};

interface UserGroupCreationAttributes extends Optional<UserGroupAttributes,"id"> {};


export class UserGroupModel extends Model<UserGroupAttributes,UserGroupCreationAttributes> implements UserGroupAttributes{
    public id!: number;
    public name!: string;
}


export default UserGroupModel.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: new DataTypes.STRING(225),
        allowNull: false,
      },
    },
    {
      tableName: "USER_GROUP",
      sequelize,
    }
);