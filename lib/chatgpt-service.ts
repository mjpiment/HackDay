// ChatGPT API Service for Next.js
// Universal LLM API Service for Next.js
export interface Task {
    id: number;
    text: string;
    completed: boolean;
  }
  
  export interface ChatMessage {
    id: number;
    text: string;
    isUser: boolean;
    timestamp: Date;
  }
  
  export const sendMessageToChatGPT = async (message: string, tasks: Task[]): Promise<string> => {
    const apiKey = process.env.NEXT_PUBLIC_LLM_API_KEY;
    const apiUrl = process.env.NEXT_PUBLIC_LLM_API_URL || 'https://api.openai.com/v1/chat/completions';
    const model = process.env.NEXT_PUBLIC_LLM_MODEL || 'gpt-3.5-turbo';
  
    if (!apiKey) {
      throw new Error('API key not found. Please add NEXT_PUBLIC_LLM_API_KEY to your .env.local file');
    }
  
    const systemPrompt = `You are a helpful assistant for a todo list application. 
    Current todos: ${JSON.stringify(tasks)}
    
    Help users with:
    - Organizing their todos
    - Suggesting task priorities
    - Breaking down complex tasks
    - Providing motivation and tips
    - Answering questions about productivity
    
    Keep responses concise and actionable.`;
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: message }
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`API request failed: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }
  
      const data = await response.json();
  
      // Handles both OpenAI and OpenRouter response formats
      const content = data.choices?.[0]?.message?.content || data.output?.[0]?.content || 'No response';
      return content;
    } catch (error) {
      console.error('Error calling LLM API:', error);
      throw error;
    }
  };
  