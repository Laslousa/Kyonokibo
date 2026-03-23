(() => {
  const navButtons = document.querySelectorAll('.floating-nav .fnav-btn[href]');
  if (!navButtons.length) {
    return;
  }

  let currentPage = window.location.pathname.split('/').pop().toLowerCase();
  if (!currentPage || currentPage === 'index.html') {
    currentPage = 'home.html';
  }

  navButtons.forEach((button) => {
    const target = button.getAttribute('href').toLowerCase();
    const targetPage = target.split('/').pop().split('?')[0].split('#')[0];
    const isActive = targetPage === currentPage;

    button.classList.toggle('active', isActive);
    if (isActive) {
      button.setAttribute('aria-current', 'page');
    } else {
      button.removeAttribute('aria-current');
    }
  });

  const settingsButtons = Array.from(navButtons).filter((button) =>
    /(?:^|\/)settings\/settings\.html(?:$|[?#])/.test(
      button.getAttribute('href').toLowerCase()
    )
  );

  if (!settingsButtons.length) {
    return;
  }

  const SETTINGS_PIN_STORAGE_KEY = 'kyonokibo_settings_pin';
  const DEFAULT_SETTINGS_PIN = '123456';
  const settingsPinModal = createSettingsPinModal();
  let pendingSettingsTarget = '';

  settingsButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      if (currentPage === 'settings.html') {
        return;
      }

      event.preventDefault();
      pendingSettingsTarget = button.getAttribute('href');
      openSettingsPinModal(settingsPinModal);
    });
  });

  settingsPinModal.form.addEventListener('submit', (event) => {
    event.preventDefault();

    const enteredPin = settingsPinModal.input.value.trim();
    const expectedPin =
      window.localStorage.getItem(SETTINGS_PIN_STORAGE_KEY) ||
      DEFAULT_SETTINGS_PIN;

    if (!/^\d{6}$/.test(enteredPin)) {
      setSettingsPinError(
        settingsPinModal,
        'Veuillez saisir un code a 6 chiffres.'
      );
      return;
    }

    if (enteredPin !== expectedPin) {
      setSettingsPinError(settingsPinModal, 'Code incorrect.');
      settingsPinModal.input.select();
      return;
    }

    closeSettingsPinModal(settingsPinModal);
    if (pendingSettingsTarget) {
      window.location.href = pendingSettingsTarget;
    }
  });

  settingsPinModal.cancelButton.addEventListener('click', () => {
    closeSettingsPinModal(settingsPinModal);
  });

  settingsPinModal.backdrop.addEventListener('click', (event) => {
    if (event.target === settingsPinModal.backdrop) {
      closeSettingsPinModal(settingsPinModal);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (
      event.key === 'Escape' &&
      settingsPinModal.backdrop.dataset.open === '1'
    ) {
      closeSettingsPinModal(settingsPinModal);
    }
  });

  function createSettingsPinModal() {
    const modalWrapper = document.createElement('div');
    modalWrapper.className = 'settings-pin-backdrop';
    modalWrapper.dataset.open = '0';
    modalWrapper.setAttribute('aria-hidden', 'true');
    modalWrapper.innerHTML = `
      <section class="settings-pin-modal" role="dialog" aria-modal="true" aria-labelledby="settings-pin-title">
        <button class="settings-pin-close" type="button" aria-label="Fermer">&times;</button>
        <h2 id="settings-pin-title">Acc&egrave;s aux param&egrave;tres</h2>
        <p class="settings-pin-text">Entrez le code de s&eacute;curit&eacute; &agrave; 6 chiffres.</p>
        <form class="settings-pin-form" novalidate>
          <div class="settings-pin-input-wrap">
            <input
              class="settings-pin-input"
              type="password"
              inputmode="numeric"
              autocomplete="one-time-code"
              maxlength="6"
              pattern="\\d{6}"
              placeholder="000000"
              aria-label="Code de securite a 6 chiffres"
              required
            />
            <button
              class="settings-pin-toggle"
              type="button"
              aria-label="Afficher le code"
              aria-pressed="false"
            >
              <svg class="icon-eye" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"></path>
                <circle cx="12" cy="12" r="3.2"></circle>
              </svg>
              <svg class="icon-eye-off" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"></path>
                <circle cx="12" cy="12" r="3.2"></circle>
                <path d="M4 4l16 16"></path>
              </svg>
            </button>
          </div>
          <p class="settings-pin-error" aria-live="polite"></p>
          <div class="settings-pin-actions">
            <button class="settings-pin-btn is-muted" type="button">Annuler</button>
            <button class="settings-pin-btn is-primary" type="submit">Entrer</button>
          </div>
        </form>
      </section>
    `;

    document.body.appendChild(modalWrapper);

    const closeButton = modalWrapper.querySelector('.settings-pin-close');
    const input = modalWrapper.querySelector('.settings-pin-input');
    const form = modalWrapper.querySelector('.settings-pin-form');
    const error = modalWrapper.querySelector('.settings-pin-error');
    const toggleButton = modalWrapper.querySelector('.settings-pin-toggle');
    const cancelButton = modalWrapper.querySelector(
      '.settings-pin-btn.is-muted'
    );
    const modalRefs = {
      backdrop: modalWrapper,
      form,
      input,
      error,
      toggleButton,
      cancelButton
    };

    toggleButton.addEventListener('click', () => {
      const isHidden = input.type === 'password';
      input.type = isHidden ? 'text' : 'password';
      toggleButton.classList.toggle('is-visible', isHidden);
      toggleButton.setAttribute(
        'aria-label',
        isHidden ? 'Masquer le code' : 'Afficher le code'
      );
      toggleButton.setAttribute('aria-pressed', String(isHidden));
      input.focus();
    });

    closeButton.addEventListener('click', () => {
      closeSettingsPinModal(modalRefs);
    });

    return modalRefs;
  }

  function openSettingsPinModal(modal) {
    clearSettingsPinState(modal);
    modal.backdrop.dataset.open = '1';
    modal.backdrop.setAttribute('aria-hidden', 'false');
    window.requestAnimationFrame(() => {
      modal.input.focus();
    });
  }

  function closeSettingsPinModal(modal) {
    clearSettingsPinState(modal);
    modal.backdrop.dataset.open = '0';
    modal.backdrop.setAttribute('aria-hidden', 'true');
  }

  function clearSettingsPinState(modal) {
    modal.input.value = '';
    modal.input.type = 'password';
    modal.input.classList.remove('has-error');
    modal.error.textContent = '';
    if (modal.toggleButton) {
      modal.toggleButton.classList.remove('is-visible');
      modal.toggleButton.setAttribute('aria-label', 'Afficher le code');
      modal.toggleButton.setAttribute('aria-pressed', 'false');
    }
  }

  function setSettingsPinError(modal, message) {
    modal.input.classList.add('has-error');
    modal.error.textContent = message;
  }
})();
