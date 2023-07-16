import './rendering-thumbnail.js';
import './open-big-picture.js';
import './valid-form.js';
import './scale.js';
import './effects.js';
import { getData } from './api.js';
import { showAlert } from './alert.js';
import { createSendForm} from './valid-form.js';
import { renderPictureModal } from './gallery.js';

createSendForm();

try {
  const data = await getData();
  renderPictureModal(data);
} catch (err) {
  showAlert(err.message);
}
