# SlugHub - AI-Powered Task Manager

A modern Next.js application that combines a todo list with ChatGPT integration for AI-powered task management assistance.

## 🚀 Features

- ✅ **Smart Todo List**: Add, edit, delete, and complete tasks with beautiful UI
- 🤖 **AI Assistant**: Get help organizing tasks, setting priorities, and productivity tips
- 💾 **Persistent Storage**: Tasks are automatically saved to your browser's localStorage
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- 📊 **Task Statistics**: Real-time stats showing total, completed, and pending tasks
- 🎨 **Modern UI**: Beautiful gradient design with Tailwind CSS and smooth animations

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Get OpenAI API Key

You'll need an OpenAI API key to use the AI chat functionality:

1. **Visit OpenAI Platform**: Go to [https://platform.openai.com/](https://platform.openai.com/)
2. **Create Account**: Sign up or log in to your account
3. **Navigate to API Keys**: Go to the API Keys section in your dashboard
4. **Create New Key**: Click "Create new secret key"
5. **Copy the Key**: Save the API key securely (you won't be able to see it again)

### 3. Configure Environment Variables

1. **Open the `.env.local` file** in the root directory
2. **Replace the placeholder** with your actual API key:

```env
NEXT_PUBLIC_OPENAI_API_KEY=sk-your-actual-api-key-here
NEXT_PUBLIC_OPENAI_API_URL=https://api.openai.com/v1/chat/completions
```

**Important**: 
- Replace `sk-your-actual-api-key-here` with your real OpenAI API key
- The key should start with `sk-`
- Never commit this file to version control

### 4. Start the Development Server

```bash
npm run dev
```

The application will open in your browser at `http://localhost:3000`

## 💰 API Costs

The app uses OpenAI's GPT-3.5-turbo model:
- **Cost**: Approximately $0.001-0.002 per message
- **Very affordable** for personal use
- **Free tier available** for new OpenAI accounts

## 🎯 How to Use

### Todo List Features
- **Add Task**: Type in the input field and press Enter or click "Add"
- **Complete Task**: Click on any task text to mark it as complete
- **Delete Task**: Click the "×" button to remove a task
- **Persistent Storage**: Tasks are automatically saved to your browser

### AI Assistant Features
- **Ask Questions**: Type any question about your tasks in the chat
- **Get Suggestions**: Ask for help organizing or prioritizing tasks
- **Break Down Tasks**: Ask the AI to help break complex tasks into smaller ones
- **Productivity Tips**: Get advice on staying productive and focused

### Example AI Prompts
- "Help me prioritize my tasks"
- "Break down 'Plan vacation' into smaller tasks"
- "What should I focus on first today?"
- "Give me tips for staying productive"
- "How can I organize my work tasks better?"
- "What's the most important task I should do today?"

## 🏗️ Project Structure

```
HackDay/
├── app/
│   ├── components/
│   │   ├── TodoList.tsx          # Main todo list component
│   │   └── ChatWrapper.tsx       # AI chat interface
│   ├── page.tsx                  # Main page with both components
│   └── layout.tsx                # App layout
├── lib/
│   └── chatgpt-service.ts        # OpenAI API integration
├── .env.local                    # Environment variables (API keys)
└── package.json                  # Dependencies and scripts
```

## 🔧 Technologies Used

- **Next.js 15.5.4** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **OpenAI GPT-3.5-turbo** - AI chat functionality
- **localStorage** - Data persistence
- **Framer Motion** - Animations

## 🚨 Troubleshooting

### "OpenAI API key not found" Error
- ✅ Make sure you've created the `.env.local` file
- ✅ Verify the API key is correct and starts with `sk-`
- ✅ Restart the development server after adding the API key
- ✅ Check that the environment variable name is `NEXT_PUBLIC_OPENAI_API_KEY`

### API Request Failed
- ✅ Check your OpenAI account has credits
- ✅ Verify your API key has the correct permissions
- ✅ Check your internet connection
- ✅ Make sure you're using a valid API key

### Tasks Not Saving
- ✅ Check that your browser supports localStorage
- ✅ Try refreshing the page
- ✅ Check browser console for any errors

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**: Commit your code to a GitHub repository
2. **Connect to Vercel**: Go to [vercel.com](https://vercel.com) and import your repository
3. **Add Environment Variables**: In Vercel dashboard, add `NEXT_PUBLIC_OPENAI_API_KEY`
4. **Deploy**: Vercel will automatically deploy your app

### Deploy to Netlify

1. **Build the project**: `npm run build`
2. **Deploy**: Upload the `out` folder to Netlify
3. **Add Environment Variables**: In Netlify dashboard, add your API key

## 🔒 Security Notes

- **Never commit** your `.env.local` file to version control
- **Keep your API key secure** and don't share it publicly
- **Monitor your API usage** in the OpenAI dashboard
- **Set usage limits** in your OpenAI account if needed

## 🎨 Customization

### Styling
- Modify colors in `tailwind.config.ts`
- Update component styles in individual `.tsx` files
- Change the gradient backgrounds in `page.tsx`

### AI Behavior
- Modify the system prompt in `lib/chatgpt-service.ts`
- Adjust temperature and max_tokens for different response styles
- Add more context about your specific use case

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Happy task managing! 🎉**
