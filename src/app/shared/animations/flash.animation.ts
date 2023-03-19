import { animate, animation, sequence, style } from "@angular/animations";

export const flashAnimation = animation([
    sequence([ //exécute toutes les animations contenues dans cette méthodes les unes après les autres
        animate('{{ time }}', style({
            'background-color': '{{ flashColor }}'
        })),
        animate('{{ time }}', style({
            'background-color': 'white'
        })),
    ])
])