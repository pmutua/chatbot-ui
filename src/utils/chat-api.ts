// export const chatApi = {
//   async sendMessage(message: string, apiKey: string): Promise<string> {
//     const response = await fetch('https://api.openai.com/v1/completions', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${apiKey}`,
//       },
//       body: JSON.stringify({
//         model: 'text-davinci-003',
//         prompt: message,
//         max_tokens: 150,
//       }),
//     });

//     const data = await response.json();
//     return data.choices[0].text.trim();
//   },
// };
export const chatApi = {
  async sendMessage(message: string, apiKey: string): Promise<string> {
    // Simulate streaming by gradually revealing the message over time
    const dummyResponse = `This is a dummy response for: ${message}`;
  
    return new Promise((resolve) => {
      let index = 0;
      const interval = setInterval(() => {
        // Append one character at a time
        const currentText = dummyResponse.substring(0, index + 1);
        
        // Log the current state of the message to simulate streaming
        console.log(currentText); // This logs each character or partial message
        console.log(apiKey) //JUST FOR TESTING will refactor this section
        // Update the chat component state (optional, depending on your implementation)
        // You would use something like this.setState() or similar to update the UI
        // e.g. this.chatMessages = [...this.chatMessages, `Bot: ${currentText}`];

        index++;

        // Once the full message is revealed, stop the interval
        if (index === dummyResponse.length) {
          clearInterval(interval);
          resolve(dummyResponse); // Return the full response after streaming is complete
        }
      }, 100); // Adjust the speed (in milliseconds) at which characters are revealed
    });
  },
};
