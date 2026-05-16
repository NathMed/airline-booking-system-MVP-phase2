const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

const FieldState = {
  NEUTRAL: "neutral",
  VALID: "valid",
  INVALID: "invalid",
};

function setFieldState(group, state) {
  if (!group) return;
  group.dataset.state = state;
}

function isValidEmail(value) {
  return EMAIL_PATTERN.test(value.trim());
}

function isValidPassword(value) {
  return value.length >= MIN_PASSWORD_LENGTH;
}

function initValidatedField({ groupId, inputId, validate }) {
  const group = document.getElementById(groupId);
  const input = document.getElementById(inputId);
  if (!group || !input) return;

  let hasBlurred = false;

  const update = ({ fromBlur = false } = {}) => {
    const rawValue = input.value;
    const value = input.type === "password" ? rawValue : rawValue.trim();

    if (!value) {
      setFieldState(group, FieldState.NEUTRAL);
      return;
    }

    if (validate(value)) {
      setFieldState(group, FieldState.VALID);
      return;
    }

    if (fromBlur) {
      setFieldState(group, FieldState.INVALID);
    } else {
      setFieldState(group, FieldState.NEUTRAL);
    }
  };

  input.addEventListener("input", () => update());
  input.addEventListener("blur", () => {
    hasBlurred = true;
    update({ fromBlur: true });
  });
  input.addEventListener("focus", () => {
    const rawValue = input.value;
    const value = input.type === "password" ? rawValue : rawValue.trim();
    if (value && !validate(value)) {
      setFieldState(group, FieldState.NEUTRAL);
    }
  });
}

function initPasswordToggle() {
  const toggle = document.querySelector(".password-toggle");
  const input = document.getElementById("password");
  const icon = toggle?.querySelector(".bi");
  if (!toggle || !input || !icon) return;

  toggle.addEventListener("click", () => {
    const isHidden = input.type === "password";
    input.type = isHidden ? "text" : "password";
    icon.classList.toggle("bi-eye", !isHidden);
    icon.classList.toggle("bi-eye-slash", isHidden);
  });
}

initValidatedField({
  groupId: "email-group",
  inputId: "email",
  validate: isValidEmail,
});

initValidatedField({
  groupId: "password-group",
  inputId: "password",
  validate: isValidPassword,
});

initPasswordToggle();

document.querySelector(".login-form")?.addEventListener("submit", (event) => {
  event.preventDefault();

  const emailGroup = document.getElementById("email-group");
  const passwordGroup = document.getElementById("password-group");
  const email = document.getElementById("email")?.value.trim() ?? "";
  const password = document.getElementById("password")?.value ?? "";

  const emailOk = isValidEmail(email);
  const passwordOk = isValidPassword(password);

  setFieldState(emailGroup, emailOk ? FieldState.VALID : FieldState.INVALID);
  setFieldState(passwordGroup, passwordOk ? FieldState.VALID : FieldState.INVALID);
});
