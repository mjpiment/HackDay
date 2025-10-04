interface Task {
  id: number;
  text: string;
  completed: boolean;
  dueTime?: string;
  dueDate: string;
}

interface ChatMessage {
  text: string;
  isUser: boolean;
}

interface APIResponse {
  message: string;
  suggestions?: string[];
}

export async function callLLMAPI(
  messages: ChatMessage[],
  tasks: Task[],
  selectedDate: string
): Promise<APIResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_LLM_API_URL;
  
  if (!apiUrl) {
    throw new Error('NEXT_PUBLIC_LLM_API_URL environment variable is not set');
  }

  // Get API keys from environment variables
  const openaiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  const anthropicKey = process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY;
  const googleKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const cohereKey = process.env.NEXT_PUBLIC_COHERE_API_KEY;
  const customApiKey = process.env.NEXT_PUBLIC_API_KEY;

  // Prepare context about the user's tasks
  const todayTasks = tasks.filter(task => task.dueDate === selectedDate);
  const completedTasks = todayTasks.filter(task => task.completed);
  const pendingTasks = todayTasks.filter(task => !task.completed);

  const taskContext = {
    selectedDate,
    totalTasks: todayTasks.length,
    completedTasks: completedTasks.length,
    pendingTasks: pendingTasks.length,
    taskList: todayTasks.map(task => ({
      text: task.text,
      completed: task.completed,
      dueTime: task.dueTime
    }))
  };

  // Prepare the conversation history and context
  const payload = {
    messages: messages,
    context: {
      userTasks: taskContext,
      systemPrompt: `You are a helpful task management assistant. Help the user with their TODO list by providing:
- Encouragement and motivation
- Practical suggestions for completing tasks
- Progress tracking insights
- Task completion tips

Current context:
- Date: ${selectedDate}
- Total tasks: ${taskContext.totalTasks}
- Completed: ${taskContext.completedTasks}
- Pending: ${taskContext.pendingTasks}
- Tasks: ${JSON.stringify(taskContext.taskList, null, 2)}

Be encouraging, helpful, and provide actionable advice. Keep responses concise but supportive.`
    }
  };

  // Prepare headers with authentication
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Add appropriate API key based on which one is available
  let authMethod = 'none';
  if (openaiKey) {
    headers['Authorization'] = `Bearer ${openaiKey}`;
    authMethod = 'OpenAI';
  } else if (anthropicKey) {
    headers['x-api-key'] = anthropicKey;
    headers['anthropic-version'] = '2023-06-01';
    authMethod = 'Anthropic';
  } else if (googleKey) {
    headers['x-goog-api-key'] = googleKey;
    authMethod = 'Google';
  } else if (cohereKey) {
    headers['Authorization'] = `Bearer ${cohereKey}`;
    authMethod = 'Cohere';
  } else if (customApiKey) {
    headers['Authorization'] = `Bearer ${customApiKey}`;
    authMethod = 'Custom';
  } else {
    // If no specific API key is found, try a generic approach
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`;
      authMethod = 'Generic';
    }
  }

  console.log(`Using ${authMethod} authentication method`);

  if (authMethod === 'none') {
    throw new Error('No API key found. Please set one of the following environment variables: NEXT_PUBLIC_OPENAI_API_KEY, NEXT_PUBLIC_ANTHROPIC_API_KEY, NEXT_PUBLIC_GOOGLE_API_KEY, NEXT_PUBLIC_COHERE_API_KEY, or NEXT_PUBLIC_API_KEY');
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Handle different response formats
    if (typeof data === 'string') {
      return { message: data };
    } else if (data.message) {
      return data;
    } else if (data.response) {
      return { message: data.response };
    } else if (data.content) {
      return { message: data.content };
    } else {
      return { message: JSON.stringify(data) };
    }
  } catch (error) {
    console.error('API call failed:', error);
    throw new Error(`Failed to get response from LLM API: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
