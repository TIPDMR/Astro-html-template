import Swiper, { Navigation } from 'swiper';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ScrollUp } from './lib/scroll-up.js';
import { MobileMenu } from './lib/mobile-menu.js'; // You can also use <link> for styles

window.onload = function () {
  new Swiper('.swiper', {
    modules: [Navigation],
    direction: 'horizontal',
    loop: true,
    navigation: {
      nextEl: '.feedbacks__button_next',
      prevEl: '.feedbacks__button_prev',
    },
  });

  new ScrollUp('.scroll-up').setEventListener();
  new MobileMenu('.menu-header').setEventListeners();
  AOS.init({ once: true });
};
