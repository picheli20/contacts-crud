
import { trigger, style, transition, animate } from '@angular/animations';

const a = { opacity: 0, transform: 'translateY(-1rem)' };
const b = {
  opacity: 1,
  transform: 'translateY(0)',
};

export const animations = [
  trigger('in', [
    transition(':enter', [
      style(a),
      animate('300ms ease-in', style(b)),
    ]),
    transition(':leave', [
      style(b),
      animate('300ms ease-in', style(a)),
    ]),
  ]),
];
