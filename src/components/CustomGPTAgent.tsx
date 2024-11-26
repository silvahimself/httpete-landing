// components/CustomGPTAgent.tsx
import React, { useState } from 'react';
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { LoaderPinwheel, Sparkle, Sparkles, WandSparkles } from 'lucide-react';

const CustomGPTAgent: React.FC = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [response, setResponse] = useState<string | null>(null);
  const [magicBtn, setMagicBtn] = useState<React.ReactNode>(<><WandSparkles/>Magic</>);
  const [loading, setLoading] = useState(false);
  
  const handleSendRequest = async () => {
    setLoading(true);
    setMagicBtn(
    <div className='flex flex-row-reverse text-black'>
      <span className='px-4'>Thinking...</span>
    <div
      className="w-5 h-5 text-white border-2 border-t-transparent border-black rounded-full animate-spin"  
    >
      </div>
      </div>)
    if (!userInput.trim()) return;
    try {
      const res = await fetch('/api/gpt-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userInput }),
      });

      const data = await res.json();
      setResponse(data.response); // Ensure your backend sends the response in this format.
    } catch (error) {
      console.error('Error fetching GPT response:', error);
      setResponse('An error occurred. Please try again.');
    }
  };

  const handleApply = () => {
    console.log('Apply clicked. Response:', response);
    // Add logic for "Apply" here.
    alert('Applied: ' + response);
  };

  const handleDiscard = () => {
    console.log('Discard clicked. Response:', response);
    setResponse(null); // Clear the response
  };

  return (
    <div className="space-y-4 p-4 border-2 border-yellow-400 rounded-xl" style={{backgroundColor: 'rgba(150,104,21, 0.2)'}}>
      <div className="flex items-center gap-2">
        <Input
          className="flex-1 text-white placeholder:text-yellow-200 placeholder:text-opacity-25 focus:text-yellow-400 border-0 focus:border-2 focus:border-yellow-400"
          style={{backgroundColor: 'rgba(150,104,21, 0.2)'}}
          placeholder="Please create a json body from the text I pasted in the body input"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <Button id='peteBtn' onClick={handleSendRequest} style={loading ? { backgroundColor:'rgb(250 204 21)' } : {}} className='border-2 border-yellow-300 ring-2 ring-yellow-400 bg-transparent hover:bg-yellow-400 hover:text-yellow-900 text-yellow-200 rounded-xl'
        onMouseEnter={() => 
        {
          if (loading) {return};
          setMagicBtn(<><WandSparkles/>Ask Pete</>)
        }}
        onMouseLeave={() => 
          { 
            if (loading) {return};
            setMagicBtn(<><WandSparkles/>Magic</>)
          }}
          
        >
          {magicBtn}
        </Button>
      </div>

      {response && (
        <Card>
          <CardContent>
            <p>{response}</p>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button variant="primary" onClick={handleApply}>
              Apply
            </Button>
            <Button variant="secondary" onClick={handleDiscard}>
              Discard
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default CustomGPTAgent;
