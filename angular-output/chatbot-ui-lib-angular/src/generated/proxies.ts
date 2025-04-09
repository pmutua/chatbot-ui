/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone } from '@angular/core';

import { ProxyCmp } from './angular-component-lib/utils';

import { Components } from 'chatbot-ui';


@ProxyCmp({
  inputs: ['apiKey', 'bubbleStyle', 'delayTime', 'fontSize', 'initialWidth', 'position', 'resizable', 'streamingData', 'theme', 'welcomeMessage']
})
@Component({
  selector: 'app-chatbot',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['apiKey', 'bubbleStyle', 'delayTime', 'fontSize', 'initialWidth', 'position', 'resizable', 'streamingData', 'theme', 'welcomeMessage'],
})
export class AppChatbot {
  protected el: HTMLAppChatbotElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface AppChatbot extends Components.AppChatbot {}


