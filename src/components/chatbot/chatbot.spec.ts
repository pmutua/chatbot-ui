import { newSpecPage } from '@stencil/core/testing';
import { ChatbotComponent } from './chatbot.component';

describe('chatbot', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ChatbotComponent],
      html: '<chatbot></chatbot>',
    });
    expect(root).toEqualHtml(`
      <chatbot>
        <mock:shadow-root>
          <div class="chat-widget light" style="width: 300px" data-position="bottom-right">
            <div class="chat-header">
              <button>
                <img src="/assets/icons/chat-icon.svg" alt="Chat Icon" />
              </button>
            </div>
          </div>
        </mock:shadow-root>
      </chatbot>
    `);
  });

  it('renders with values', async () => {
    const { root } = await newSpecPage({
      components: [ChatbotComponent],
      html: `<chatbot first="John" middle="Doe" last="Smith"></chatbot>`,
    });
    expect(root).toEqualHtml(`
      <chatbot first="John" middle="Doe" last="Smith">
        <mock:shadow-root>
          <div class="chat-widget light" style="width: 300px" data-position="bottom-right">
            <div class="chat-header">
              <button>
                <img src="/assets/icons/chat-icon.svg" alt="Chat Icon" />
              </button>
            </div>
          </div>
        </mock:shadow-root>
      </chatbot>
    `);
  });
});
