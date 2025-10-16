import { useState } from 'react';
import { Textarea } from './Textarea';

/**
 * Example usage of the Textarea component
 * This file demonstrates all the features and variants
 */
export function TextareaExamples() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('This is a filled variant textarea');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');

  return (
    <div className="space-y-8 p-8 max-w-2xl">
      <h1 className="text-2xl font-bold">Textarea Component Examples</h1>

      {/* Basic Outlined Variant */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Outlined Variant (Default)</h2>
        <Textarea
          label="Bio"
          placeholder="Tell us about yourself..."
          helperText="Maximum 500 characters"
          rows={4}
          value={value1}
          onChange={(e) => setValue1(e.target.value)}
        />
      </div>

      {/* Filled Variant with Character Count */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Filled Variant with Character Count</h2>
        <Textarea
          variant="filled"
          label="Description"
          placeholder="Enter description..."
          helperText="Describe your project"
          rows={5}
          maxLength={200}
          showCharCount
          value={value2}
          onChange={(e) => setValue2(e.target.value)}
        />
      </div>

      {/* Standard Variant */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Standard Variant</h2>
        <Textarea
          variant="standard"
          label="Notes"
          placeholder="Add your notes..."
          rows={3}
          value={value3}
          onChange={(e) => setValue3(e.target.value)}
        />
      </div>

      {/* Error State */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Error State</h2>
        <Textarea
          label="Comment"
          placeholder="Write your comment..."
          required
          error
          errorMessage="Comment is required and must be at least 10 characters"
          rows={4}
          value={value4}
          onChange={(e) => setValue4(e.target.value)}
        />
      </div>

      {/* Disabled State */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Disabled State</h2>
        <Textarea
          label="Read-only Content"
          value="This textarea is disabled and cannot be edited"
          disabled
          rows={3}
        />
      </div>

      {/* With Native HTML Props */}
      <div>
        <h2 className="text-xl font-semibold mb-4">With Native HTML Props</h2>
        <Textarea
          label="Feedback"
          placeholder="Your feedback..."
          required
          name="feedback"
          id="feedback-textarea"
          rows={4}
          cols={50}
          autoFocus
          spellCheck
          helperText="All native HTML textarea attributes are supported"
        />
      </div>

      {/* With Character Count and Max Length */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Character Count with Max Length</h2>
        <Textarea
          variant="outlined"
          label="Tweet"
          placeholder="What's happening?"
          rows={3}
          maxLength={280}
          showCharCount
          helperText="Keep it short and sweet"
        />
      </div>
    </div>
  );
}
