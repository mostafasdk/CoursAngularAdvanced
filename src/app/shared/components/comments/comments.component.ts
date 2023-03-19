import { animate, animateChild, group, query, sequence, stagger, state, style, transition, trigger, useAnimation } from '@angular/animations';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Comment } from 'app/core/models/comment.model';
import { flashAnimation } from 'app/shared/animations/flash.animation';
import { slideAndFadeAnimation } from 'app/shared/animations/slideAndFade.animation';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  animations: [
    trigger('list', [
      transition(':enter', [
          query('@listItem', [ //on sélectionne tous les éléments ayant le trigger "@listItem"
              stagger(50, [ //décale l'animation de chaque élément de 50ms
                  animateChild() //déclenche l'animation de chaque élément
              ])
          ])
      ])
  ]),
    trigger('listItem', [
      state('default', style({
        transform: 'scale(1)',
        'background-color': 'white',
        'z-index': 1
      })),
      state('active', style({
        transform: 'scale(1.02)',
        'background-color': 'rgb(201, 157, 242)',
        'z-index': 2
      })),
      transition('default => active', [
        animate('100ms ease-in-out')
      ]),
      transition('active => default', [
        animate('500ms ease-in-out')
      ]),
      transition(':enter', [
        query('.comment-text, .comment-details', [
          style({
            opacity: 0
          })
        ]),
        useAnimation(slideAndFadeAnimation, {
          params: {
            time: '500ms',
            startColor: 'rgb(201, 157, 242)'
          }
        }),
        group([ //exécute toutes les animations contenues dans cette méthode en même temps
          useAnimation(flashAnimation, {
            params: {
              time: '250ms',
              flashColor: 'rgb(249,179,111)'
            }
          }),
          query('.comment-text', [
            animate('250ms', style({
              opacity: 1
            }))
          ]),
          query('.comment-details', [
            animate('500ms', style({
              opacity: 1
            }))
          ])
        ]),
    ])
    ])
  ]
})
export class CommentsComponent implements OnInit {

  @Input() comments!: Comment[];
  @Output() newComment = new EventEmitter<string>();
  
  user = {firstName : 'mOstAfa', lastName : 'sAdIki'}
  commentCtrl!: FormControl;
  animationStates: { [key: number]: 'default' | 'active' } = {};
  // listItemAnimationState: 'default' | 'active' = 'default';

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.commentCtrl = this.formBuilder.control('', [Validators.required, Validators.minLength(10)]);
    for (let index in this.comments) {
      this.animationStates[index] = 'default';
    }
  }

  onLeaveComment(): void {
    if (this.commentCtrl.invalid) {
      return;
    }
    const maxId = Math.max(...this.comments.map(comment => comment.id));
    this.comments.unshift({
        id: maxId + 1,
        comment: this.commentCtrl.value,
        createdDate: new Date().toISOString(),
        userId: 1
    });
    this.newComment.emit(this.commentCtrl.value);
    this.commentCtrl.reset();
  }

  onListItemMouseEnter(index: number) {
    this.animationStates[index] = 'active';
  }

  onListItemMouseLeave(index: number) {
      this.animationStates[index] = 'default';
  }

}
