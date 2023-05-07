export const focusElement = ({ id }: { id: string }): void => {
  const element = document.getElementById(id);
  if (element) {
    element.focus();
  }
};

export const focusPhoneInput = ({ name }: { name: string }): void => {
  const form = document.forms.namedItem('phone');
  if (!form) {
    return;
  }
  const input = form[name];
  if (input) {
    input.focus();
  }
};

export const blurPhoneInput = ({ name }: { name: string }): void => {
  const form = document.forms.namedItem('phone');
  if (!form) {
    return;
  }
  const input = form[name];
  if (input) {
    input.blur();
  }
};
