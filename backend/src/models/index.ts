import Record,{RecordModel} from './records';
import User,{UserModel} from './user';
import UserGroup,{UserGroupModel} from './user_group'

Record.belongsTo(User,{as: 'doctor',foreignKey: 'doctor_id',targetKey: "id"});
Record.belongsTo(User,{as: 'patient',foreignKey: 'user_id',targetKey: "id"});
User.hasMany(Record,{as : 'records',foreignKey: 'doctor_id'});
User.belongsTo(UserGroupModel,{as: 'group',foreignKey: 'group_id'});



export default {
    UserGroup,User,Record
}