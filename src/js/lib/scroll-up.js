import { throttle } from './throttle.js';

export class ScrollUp {
  _lastCallTime = Date.now();

  constructor(selectorButton) {
    this._elementButton = document.querySelector(selectorButton);
    this._handleScroll = this._handleScroll.bind(this);
    this._scrollCalc();
  }

  _scrollCalc() {
    if (document.documentElement.scrollTop > document.documentElement.clientHeight / 2) {
      this._elementButton.classList.add('show');
      this._elementButton.classList.remove('hide');
    } else {
      this._elementButton.classList.add('hide');
      this._elementButton.classList.remove('show');
    }
  }

  _handleScroll() {
    // Проверяем, прошло ли достаточно времени с момента последнего вызова функции
    if (Date.now() - this._lastCallTime > 25) {
      // Выполняем функцию
      this._scrollCalc();
      // Обновляем время последнего вызова функции
      this._lastCallTime = Date.now();
    }
  }

  setEventListener() {
    document.addEventListener('scroll', this._handleScroll);
    this._elementButton.addEventListener('click', this.actionScrollToTop);
  }

  actionScrollToTop(e) {
    e.preventDefault();
    document.querySelector('html').scrollIntoView({
      behavior: 'smooth',
      top: '0',
    });
  }
}
