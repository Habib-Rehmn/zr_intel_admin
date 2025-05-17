
'use client';

// pages/generate-prompt.js
import { useState } from 'react';
import Head from 'next/head';

export default function GeneratePrompt() {
  const [selectedDate, setSelectedDate] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePrompt = () => {
    if (!selectedDate) {
      alert('Please select a date first');
      return;
    }

    setIsGenerating(true);

    // Format the date for display
    const date = new Date(selectedDate);
    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Generate a prompt based on the selected date
    setTimeout(() => {
      const prompt = `Create a news article for ${formattedDate}. Include the following elements:
      
1. An engaging headline that captures attention
2. A detailed introduction summarizing the key points
3. Location: [Specify relevant location]
4. Body text with at least 3 paragraphs of content
5. Include quotes from relevant sources
6. Add background context where appropriate
7. Categories: News, [Additional category]
8. Tags: [Add 3-5 relevant tags]
9. Indicate if this should be featured content

The tone should be professional and factual. The news item should be approximately 500 words in length.`;

      setGeneratedPrompt(prompt);
      setIsGenerating(false);
    }, 500);
  };

  const copyToClipboard = () => {
    if (!generatedPrompt) return;
    
    navigator.clipboard.writeText(generatedPrompt)
      .then(() => {
        alert('Prompt copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <Head>
        <title>Generate News Prompt</title>
        <meta name="description" content="Generate news prompts based on date" />
      </Head>

      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-blue-800 mb-8">Generate News Prompt</h1>

        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <div className="mb-6">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
              Select Date
            </label>
            <input
              type="date"
              id="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <p className="mt-1 text-sm text-gray-500">
              Choose a date to generate a news prompt
            </p>
          </div>

          <div className="flex justify-end">
            <button
              onClick={generatePrompt}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              disabled={isGenerating || !selectedDate}
            >
              {isGenerating ? 'Generating...' : 'Generate Prompt'}
            </button>
          </div>
        </div>

        {generatedPrompt && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-blue-800">Generated Prompt</h2>
              <button
                onClick={copyToClipboard}
                className="px-4 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Copy
              </button>
            </div>
            <div className="bg-gray-50 p-4 rounded-md whitespace-pre-wrap font-mono text-sm">
              {generatedPrompt}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}