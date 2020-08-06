import {
    Model,
    DataTypes,
    Optional,
    HasOneGetAssociationMixin,
    Association,
  } from "sequelize";
import {UserGroupModel} from './user_group';
import {RecordModel} from './records';

import sequelize from '../dbconfig';


interface UserAttributes {
    id: number;
    name : string;
    surname : string;
    second_name : string;
    session_id : string;
    group_id : number;
};

interface DoctorCreationAttributes extends Optional<UserAttributes,"id"> {};


export class UserModel extends Model<UserAttributes,DoctorCreationAttributes> implements UserAttributes{
    public id!: number;
    public name!: string;
    public surname!: string;
    public second_name!: string;
    public group_id!: number;
    public session_id! : string;
    
    public readonly group? : UserGroupModel;
    public readonly records?: RecordModel[];
    

    public static associations: {
      group : Association<UserModel,UserGroupModel>;
      records : Association<UserModel,RecordModel>;
  };
}


UserModel.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(225),
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING(225),
        allowNull: false,
      },
      second_name: {
        type : DataTypes.STRING(225),
        allowNull : false,
      },
      group_id: {
        type : DataTypes.INTEGER.UNSIGNED,
        allowNull : false
      },
      session_id: {
        type : DataTypes.STRING(225),
        allowNull : false
      }
    },
    {
      tableName: "USER",
      sequelize, 
    }
);


export default UserModel;