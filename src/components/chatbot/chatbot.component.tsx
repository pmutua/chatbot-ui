import { Component, h, Prop, State, Listen, Element, Watch } from '@stencil/core';
import { chatApi } from '../../utils/chat-api';

@Component({
  tag: 'app-chatbot',
  styleUrl: 'chatbot.css',
  shadow: true,
})
export class ChatbotComponent {
  @Element() el: HTMLElement;
  private chatBubblesRef?: HTMLDivElement;

  @Prop() streamingData: boolean = true;
  @Prop() initialWidth: string = '350px';
  @Prop() resizable: boolean = true;
  @Prop() position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' = 'bottom-right';
  @Prop() theme: 'light' | 'dark' = 'light';
  @Prop() bubbleStyle: { borderRadius: string, backgroundColor: string, color: string } = { borderRadius: '18px', backgroundColor: '#4f46e5', color: 'white' };
  @Prop() fontSize: string = '14px';
  @Prop() apiKey: string;
  @Prop() delayTime: number = 100;
  @Prop() welcomeMessage: string = "Hi there! How can I help you today?";

  @State() isChatVisible: boolean = false;
  @State() chatMessages: Array<{type: 'user' | 'bot', content: string, timestamp: number}> = [];
  @State() userInput: string = '';
  @State() isResizing: boolean = false;
  @State() width: string = this.initialWidth;
  @State() isTyping: boolean = false;

  @Listen('resize', { target: 'window' })
  onResize() {
    if (window.innerWidth < 640) {
      this.width = '90%';
    } else if (this.resizable) {
      this.width = this.initialWidth;
    }
  }

  @Watch('isChatVisible')
  watchVisibility(newValue: boolean) {
    if (newValue && this.chatMessages.length === 0) {
      // Display welcome message when chat is first opened
      this.chatMessages = [
        { type: 'bot', content: this.welcomeMessage, timestamp: Date.now() }
      ];
    }
    
    if (newValue) {
      // Scroll to bottom when chat is opened
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  toggleChatVisibility() {
    this.isChatVisible = !this.isChatVisible;
  }

  handleUserInput(event: Event) {
    this.userInput = (event.target as HTMLInputElement).value;
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  scrollToBottom() {
    if (this.chatBubblesRef) {
      this.chatBubblesRef.scrollTop = this.chatBubblesRef.scrollHeight;
    }
  }

  async sendMessage() {
    if (this.userInput.trim() && !this.isTyping) {
      // Add user message
      const userMessage = this.userInput;
      this.chatMessages = [
        ...this.chatMessages, 
        { type: 'user', content: userMessage, timestamp: Date.now() }
      ];
      this.userInput = ''; // Clear input field
      this.scrollToBottom();
      
      // Set typing indicator
      this.isTyping = true;
      
      try {
        // Simulate slight delay for more natural feeling
        await this.sleep(500);
        
        // Get bot response
        const response: string = await chatApi.sendMessage(userMessage, this.apiKey);
        
        if (this.streamingData) {
          // Simulate streaming word-by-word
          let botResponse = '';
          const words = response.split(' ');
          
          // Add typing indicator message
          const typingIndex = this.chatMessages.length;
          this.chatMessages = [
            ...this.chatMessages,
            { type: 'bot', content: '...', timestamp: Date.now() }
          ];
          
          for (const word of words) {
            botResponse += (botResponse ? ' ' : '') + word;
            
            // Update just the typing indicator message
            this.chatMessages = [
              ...this.chatMessages.slice(0, typingIndex),
              { type: 'bot', content: botResponse, timestamp: Date.now() }
            ];
            
            this.scrollToBottom();
            await this.sleep(this.delayTime);
          }
        } else {
          // Just add the full response
          this.chatMessages = [
            ...this.chatMessages,
            { type: 'bot', content: response, timestamp: Date.now() }
          ];
          this.scrollToBottom();
        }
      } catch (error) {
        this.chatMessages = [
          ...this.chatMessages,
          { type: 'bot', content: 'Sorry, something went wrong. Please try again.', timestamp: Date.now() }
        ];
        this.scrollToBottom();
      } finally {
        this.isTyping = false;
      }
    }
  }
  
  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  startResizing(event: MouseEvent) {
    if (this.resizable) {
      this.isResizing = true;
      event.preventDefault();
    }
  }

  stopResizing() {
    this.isResizing = false;
  }

  onResizing(event: MouseEvent) {
    if (this.isResizing) {
      // Set a minimum width
      const minWidth = 280;
      const newWidth = Math.max(minWidth, event.clientX);
      this.width = `${newWidth}px`;
    }
  }

  disconnectedCallback() {
    window.removeEventListener('mousemove', this.onResizing.bind(this));
    window.removeEventListener('mouseup', this.stopResizing.bind(this));
  }

  componentWillLoad() {
    window.addEventListener('mousemove', this.onResizing.bind(this));
    window.addEventListener('mouseup', this.stopResizing.bind(this));
    
    // Initialize width with responsive consideration
    if (window.innerWidth < 640) {
      this.width = '90%';
    }
  }

  formatTime(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  render() {
    return (
      <div
        class={`chat-widget ${this.theme}`}
        style={{ width: this.width }}
        data-position={this.position}
      >
        <div class="chat-header">
          <button onClick={() => this.toggleChatVisibility()} aria-label="Toggle chat">
            <img class="chat-icon" src="/assets/icons/chat-svgrepo-com.svg" alt="Chat Icon" />
          </button>
        </div>
        
        {this.isChatVisible && (
          <div class="chat-container">
            <div 
              class="chat-bubbles" 
              ref={(el) => this.chatBubblesRef = el as HTMLDivElement}
            >
              {this.chatMessages.map((message, index) => (
                <div key={index} class={`chat-bubble ${message.type}`}>
                  <div class="bubble-text" style={{ fontSize: this.fontSize }}>
                    {message.type === 'user' ? 'You: ' : 'Bot: '}
                    {message.content}
                  </div>
                  <span class="message-time">{this.formatTime(message.timestamp)}</span>
                </div>
              ))}
              
              {this.isTyping && (
                <div class="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              )}
            </div>
            
            <div class="input-area">
              <input
                type="text"
                placeholder="Type your message..."
                value={this.userInput}
                onInput={(event) => this.handleUserInput(event)}
                onKeyDown={(event) => this.handleKeyDown(event)}
                aria-label="Message input"
              />
              <button 
                onClick={() => this.sendMessage()} 
                disabled={this.isTyping || !this.userInput.trim()}
                aria-label="Send message"
              >
                Send
              </button>
            </div>
          </div>
        )}
        
        {this.resizable && this.isChatVisible && (
          <div
            class="resize-handle"
            onMouseDown={(event) => this.startResizing(event)}
            aria-label="Resize chat"
          ></div>
        )}
      </div>
    );
  }
}