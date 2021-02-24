import { Fields } from 'src/dependencies/fields/Fields';
import { reply, processor } from 'src/dependencies/fields/ticket/detail/detail';
import { post } from 'src/dependencies/fields/ticket/list/list';
import { copyToPeople } from 'src/dependencies/fields/ticket/create/create';
import RichTextEditorComponent from 'src/modules/component/rich-text-editor';
import UserChooserComponent from 'src/modules/component/UserChooser';

export default new Fields([
  post,
  processor.clone().setFormItemWidth('700px'),
  reply
    .clone()
    .setEditComponent(RichTextEditorComponent)
    .setFormItemWidth('700px'),
  copyToPeople
    .clone()
    .setEditComponent(UserChooserComponent)
    .setCustomize('singleton', false)
    .setFormItemWidth('700px')
]);
