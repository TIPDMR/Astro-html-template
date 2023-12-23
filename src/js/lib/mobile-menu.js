export class MobileMenu {
  constructor(selectorMenu) {
    this._containerMenu = document.querySelector(selectorMenu);
    this._containerButtonOpen = document.querySelector('.button-menu-mobile');
    this._containerButtonClose = document.querySelector('.menu-header__button-close');
    this._classMenuActive = 'menu-header_show';

    this._handleToggle = this._handleToggle.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);

    this._transitionEndListener = this._transitionEndListener.bind(this);
    this._handleDocumentClick = this._handleDocumentClick.bind(this);
  }

  _transitionEndListener() {
    this._containerMenu.classList.remove('animation-fade-in', 'animation-fade-out');
    if (this._containerMenu.classList.contains(this._classMenuActive)) {
      this._containerMenu.classList.add(this._classMenuActive);
    }
  }

  _handleToggle() {
    if (this._containerMenu.classList.contains(this._classMenuActive)) {
      this._containerMenu.classList.remove(this._classMenuActive);
      this._containerMenu.classList.add('animation-fade-out');
    } else {
      this._containerMenu.classList.add('animation-fade-in', this._classMenuActive);
    }
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this._handleToggle();
    }
  }

  _handleDocumentClick(event) {
    if (event.target === this._containerMenu) {
      this._handleToggle();
    }
    if (event.target.classList.contains('menu-header__link')) {
      document.querySelector(event.target.hash).scrollIntoView({
        behavior: 'smooth',
      });
      this._handleToggle();
    }
  }

  setEventListeners() {
    this._containerButtonOpen.addEventListener('click', this._handleToggle);
    this._containerButtonClose.addEventListener('click', this._handleToggle);
    this._containerMenu.addEventListener('transitionend', this._transitionEndListener);
    document.addEventListener('mousedown', this._handleDocumentClick);
    document.addEventListener('keydown', this._handleEscClose);
  }
}
