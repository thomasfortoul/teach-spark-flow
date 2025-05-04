
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChatInterfaceProps {
  phase: 'planning' | 'presentation' | 'evaluation';
  promptSuggestions: string[];
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ phase, promptSuggestions }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    {
      role: 'assistant',
      content: `Welcome to the ${phase} phase! How can I help you today?`
    }
  ]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    const newMessages = [
      ...messages,
      { role: 'user', content: input },
      { role: 'assistant', content: `This is a placeholder response for "${input}". In a real implementation, this would call the AI model to generate a helpful response for the ${phase} phase.` }
    ];
    
    setMessages(newMessages);
    setInput('');
  };

  const handlePromptSuggestion = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 overflow-x-auto flex gap-2">
        {promptSuggestions.map((suggestion, index) => (
          <div 
            key={index} 
            className="prompt-suggestion"
            onClick={() => handlePromptSuggestion(suggestion)}
          >
            {suggestion}
          </div>
        ))}
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-2xl p-4 ${
                message.role === 'user' 
                  ? 'bg-primary text-white' 
                  : 'bg-muted'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!input.trim()}
            className="px-4"
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
