"use client"
import { Button } from '@/components/ui/button';
import React, { FormEvent } from 'react';

// Define the props type if you plan to pass any (optional here)
interface FormProps {
  // Add props if needed, e.g., onSubmit: () => void;
}

const TwoButtonForm: React.FC<FormProps> = () => {
  // State to manage form input (example: a simple text field)
  const [inputValue, setInputValue] = React.useState<string>('');

  // Handler for the first button (e.g., form submission)
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents page refresh
    console.log('Form submitted with value:', inputValue);
    // Add your submission logic here
  };

  // Handler for the second button (e.g., a different action)
  const handleOtherAction = () => {
    console.log('Other action triggered with value:', inputValue);
    // Add your custom logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Example input field */}
      <div>
        <label htmlFor="inputField">Enter something:</label>
        <input
          id="inputField"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>

      {/* First button: Submits the form */}
      <Button type="submit">Submit</Button>

      {/* Second button: Triggers a different action */}
      <Button type="button" onClick={handleOtherAction}>
        Do Something Else
      </Button>
    </form>
  );
};

export default TwoButtonForm;