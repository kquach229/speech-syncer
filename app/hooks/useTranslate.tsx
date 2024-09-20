import { useEffect, useState, useCallback } from 'react';
import OpenAI from 'openai';

// Ensure that the OpenAI API key is set
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '', // Use environment variable
  dangerouslyAllowBrowser: true, // Understand the implications of using this option
});

const useTranslate = (sourceText: string, selectedLanguage: string): string => {
  const [targetText, setTargetText] = useState('');

  // Function to handle translation new build
  const handleTranslate = useCallback(
    async (text: string) => {
      try {
        const response = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: `Translate this to ${selectedLanguage}: ${text}`,
            },
          ],
          stream: false, // Set to false if you don't need streaming
        });

        //
        const data =
          response.choices[0].message.content ||
          'Api error: you do not have access to the chat-gpt4 plan or your credits have run out. Please upgrade your billing plan to continue using';

        setTargetText(data);
      } catch (error) {
        // Use 'unknown' for error to handle dynamic error types
        if (error instanceof Error) {
          console.error('Error translating text:', error.message);
          setTargetText('Translation error: ' + error.message); // Provide user-friendly error message
        } else {
          console.error('Unknown error translating text');
          setTargetText('Unknown error occurred during translation.');
        }
      }
    },
    [selectedLanguage]
  );

  // useEffect to trigger translation when sourceText or selectedLanguage changes
  useEffect(() => {
    if (sourceText.trim()) {
      const timeoutId = setTimeout(() => {
        handleTranslate(sourceText);
      }, 500); // Add delay to avoid rapid calls

      return () => clearTimeout(timeoutId);
    }
  }, [sourceText, selectedLanguage, handleTranslate]); // Dependency array

  return targetText;
};

export default useTranslate;
