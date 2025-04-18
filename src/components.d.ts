/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface AppChatbot {
        "apiKey": string;
        "bubbleStyle": { borderRadius: string, backgroundColor: string, color: string };
        "delayTime": number;
        "fontSize": string;
        "initialWidth": string;
        "position": 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
        "resizable": boolean;
        "streamingData": boolean;
        "theme": 'light' | 'dark';
        "welcomeMessage": string;
    }
}
declare global {
    interface HTMLAppChatbotElement extends Components.AppChatbot, HTMLStencilElement {
    }
    var HTMLAppChatbotElement: {
        prototype: HTMLAppChatbotElement;
        new (): HTMLAppChatbotElement;
    };
    interface HTMLElementTagNameMap {
        "app-chatbot": HTMLAppChatbotElement;
    }
}
declare namespace LocalJSX {
    interface AppChatbot {
        "apiKey"?: string;
        "bubbleStyle"?: { borderRadius: string, backgroundColor: string, color: string };
        "delayTime"?: number;
        "fontSize"?: string;
        "initialWidth"?: string;
        "position"?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
        "resizable"?: boolean;
        "streamingData"?: boolean;
        "theme"?: 'light' | 'dark';
        "welcomeMessage"?: string;
    }
    interface IntrinsicElements {
        "app-chatbot": AppChatbot;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-chatbot": LocalJSX.AppChatbot & JSXBase.HTMLAttributes<HTMLAppChatbotElement>;
        }
    }
}
