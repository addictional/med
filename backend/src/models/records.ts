import {
    Model,
    DataTypes,
    HasOneGetAssociationMixin,
    Association,
    Optional,
    Sequelize,
  } from "sequelize";


import {UserModel} from './user';  

import sequelize from '../dbconfig';



interface RecordAttributes {
    id: number;
    doctor_id: number;
    user_id: number;
    date: Date;
    complaint: string;
    fio: string;
};

interface DoctorCreationAttributes extends Optional<RecordAttributes,"id"> {};


export class RecordModel extends Model<RecordAttributes,DoctorCreationAttributes> implements RecordAttributes{
    public id!: number;
    public doctor_id!: number;
    public user_id!: number;
    public date!: Date;
    public complaint!: string;
    public fio!: string;

    public getDoctor!: HasOneGetAssociationMixin<UserModel>;

    public readonly doctor?: UserModel;
    public readonly patient?: UserModel;

    public static associations: {
        doctor : Association<RecordModel,UserModel>;
        patient : Association<RecordModel,UserModel>;
    };
}

RecordModel.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      doctor_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull : false,
      },
      user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull : false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      complaint : {
        type : DataTypes.TEXT,
        allowNull : true
      },
      fio: {
        type: DataTypes.STRING(255),
        allowNull : false
      }
    },
    {
      tableName: "RECORD",
      sequelize,
    }
);

export default RecordModel;

