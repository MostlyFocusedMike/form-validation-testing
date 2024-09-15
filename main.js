const ADD = 'add';
const REMOVE = 'remove';

const curryHandleError = (mode) => (e) => {
  const { name, validity, type, parentElement } = e.target;
  const tag = type.match(/checkbox|radio/) ? parentElement : e.target;
  const errorSpanEl = document.querySelector(`#${name}-error`);
  const addErrorToInvalidInput = mode === ADD && !validity.valid;
  const removeErrorFromValidInput = mode === REMOVE && validity.valid;

  if (addErrorToInvalidInput) {
    tag.classList.add('error');
    if (errorSpanEl) errorSpanEl.style.display = 'block';
  } else if (removeErrorFromValidInput) {
    tag.classList.remove('error');
    if (errorSpanEl) errorSpanEl.style.display = 'none';
  }
};

const handleSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formDataObj = Object.fromEntries(formData.entries());
  alert(JSON.stringify(formDataObj, null, 2));
};

const form = document.querySelector('#main-form');

form.addEventListener('submit', handleSubmit);
form.addEventListener('blur', curryHandleError(ADD), true);
form.addEventListener('input', curryHandleError(REMOVE));

// const getIsFormValid = (form) => {
//   return [...form.elements].every((element) => {
//     if (element.matches('button')) return true;
//     return ('validity' in element) ? element.validity.valid : true;
//   });
// };

// const submitButton = form.querySelector('button[type="submit"]');
// submitButton.disabled = !getIsFormValid(form);

// const checkFormValidity = () => {
//   submitButton.disabled = !getIsFormValid(form);
// };

// form.addEventListener('input', checkFormValidity);


// for (const input of form.querySelectorAll('[name]')){
//   input.addEventListener('blur', curryHandleError(true));
//   input.addEventListener('input', curryHandleError(false));
// }