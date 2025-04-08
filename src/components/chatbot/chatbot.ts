import { newE2EPage } from '@stencil/core/testing';

describe('chatbot', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<chatbot></chatbot>');
    const element = await page.find('chatbot');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the chat message data', async () => {
    const page = await newE2EPage();

    await page.setContent('<chatbot></chatbot>');
    const component = await page.find('chatbot');
    const element = await page.find('chatbot >>> .chat-bubbles');
    expect(element.textContent).toEqual('');

    // Simulate sending a message
    component.setProperty('userInput', 'Hello');
    await page.waitForChanges();

    // Simulate bot response
    component.setProperty('chatMessages', ['You: Hello', 'Bot: Hello, how can I help?']);
    await page.waitForChanges();

    expect(element.textContent).toContain('You: Hello');
    expect(element.textContent).toContain('Bot: Hello, how can I help?');
  });

  it('renders and updates chat visibility', async () => {
    const page = await newE2EPage();

    await page.setContent('<chatbot></chatbot>');
    const component = await page.find('chatbot');
    const chatContainer = await page.find('chatbot >>> .chat-container');

    // Initially chat should not be visible
    expect(chatContainer).toBeNull();

    // Toggle chat visibility
    await component.callMethod('toggleChatVisibility');
    await page.waitForChanges();

    // After toggling, chat should be visible
    const visibleChatContainer = await page.find('chatbot >>> .chat-container');
    expect(visibleChatContainer).not.toBeNull();
  });
});
