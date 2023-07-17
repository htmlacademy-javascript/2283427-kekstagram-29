import { getData, sendData } from './api.js';
import { showAlert } from './alert.js';
import { createSendForm, closeModalForm } from './valid-form.js';
import { renderGallery } from './gallery.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { showSort } from './sort.js';
import { debounce } from './utilities.js';

createSendForm(async (data) => {
  try {
    await sendData(data);
    closeModalForm();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const data = await getData();
  const debouncedRenderGallery = debounce(renderGallery);
  showSort(data, debouncedRenderGallery);
  renderGallery(data);
} catch (err) {
  showAlert(err.message);
}
