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
        <h2 id="settings-pin-title">Accès aux paramètres</h2>
        <p class="settings-pin-text">Entrez le code de sécurité à 6 chiffres.</p>
        <form class="settings-pin-form" novalidate>
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
    const cancelButton = modalWrapper.querySelector(
      '.settings-pin-btn.is-muted'
    );

    closeButton.addEventListener('click', () => {
      closeSettingsPinModal({
        backdrop: modalWrapper,
        input,
        error
      });
    });

    return {
      backdrop: modalWrapper,
      form,
      input,
      error,
      cancelButton
    };
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
    modal.input.classList.remove('has-error');
    modal.error.textContent = '';
  }

  function setSettingsPinError(modal, message) {
    modal.input.classList.add('has-error');
    modal.error.textContent = message;
  }
})();
