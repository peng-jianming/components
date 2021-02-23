import {
  title,
  permissionCode,
  description
} from 'src/dependencies/fields/admin/permission/settingManage';
import PermissionCodecomponent from '../components/PermissionCode';

export default [
  title,
  permissionCode.clone().setListComponent(PermissionCodecomponent),
  description
];
