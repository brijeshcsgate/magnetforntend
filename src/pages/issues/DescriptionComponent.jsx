import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { microphone, spearkerWorking, spearker } from '@/assets/Icons';

const DescriptionComponent = ({
  values,
  setFieldValue,
  transcript,
  setTranscript,
  isListening,
  toggleListening,
  handleSpeak,
  isSpeaking,
  onDescriptionUpdate,
}) => {
  const [localDescription, setLocalDescription] = useState(values.description);
  const lastProcessedTranscript = useRef('');
  const timeoutRef = useRef(null);
  const inactivityTimeout = useRef(null);

  const handleToggleListening = useCallback(() => {
    console.log('Toggling listening state');
    toggleListening();
    if (isListening) {
      setTranscript('');
      lastProcessedTranscript.current = '';
      clearTimeout(inactivityTimeout.current);
    }
  }, [isListening, setTranscript, toggleListening]);

  useEffect(() => {
    console.log('values.description changed:', values.description);
    if (values.description !== localDescription) {
      onDescriptionUpdate(values.description);
      setLocalDescription(values.description);
    }
  }, [values.description, localDescription]);
  
  const updateDescription = useCallback(
    (newDescription) => {
      console.log('Updating description:', newDescription);
      setLocalDescription(newDescription);
      setFieldValue('description', newDescription);
      try {
        onDescriptionUpdate(newDescription);
        console.log('Description update callback called successfully');
      } catch (error) {
        console.error('Error in onDescriptionUpdate callback:', error);
      }
    },
    [setFieldValue, onDescriptionUpdate]
  );

  useEffect(() => {
    if (transcript && transcript !== lastProcessedTranscript.current) {
      console.log('Processing new transcript:', transcript);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      inactivityTimeout.current = setTimeout(() => {
        if (isListening) {
          handleToggleListening();
        }
      }, 2000);

      timeoutRef.current = setTimeout(() => {
        const newTranscript = transcript.trim();
        const updatedDescription = localDescription
          ? `${localDescription.trim()} ${newTranscript}`
          : newTranscript;
        updateDescription(updatedDescription);
        lastProcessedTranscript.current = transcript;
      }, 200);
    }
  }, [
    transcript,
    isListening,
    handleToggleListening,
    localDescription,
    updateDescription,
  ]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (inactivityTimeout.current) {
        clearTimeout(inactivityTimeout.current);
      }
    };
  }, []);

  const handleTextareaChange = (e) => {
    const value = e.target.value;
    console.log('Textarea value changed:', value);
    updateDescription(value);
  };

  return (
    <div className="group-type-1-equal">
      <div>
        <div className="flex justify-between place-items-baseline">
          <div>
            <Label htmlFor={'description'}>Description</Label>
          </div>
          <div className="flex align-middle items-center gap-10 mt-3">
            <div>
              <Badge
                onClick={handleToggleListening}
                className="m-1 cursor-pointer"
                variant={!isListening ? 'issueOpen' : 'closedOpen'}
              >
                <div className="mr-1">{microphone({})}</div>
                {isListening ? 'Stop Recording' : 'Record'}
              </Badge>
            </div>
            <div>
              {localDescription && (
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    console.log('Speaking description:', localDescription);
                    handleSpeak(localDescription);
                  }}
                  disabled={isSpeaking}
                >
                  {isSpeaking ? spearkerWorking({}) : spearker({})}
                </div>
              )}
            </div>
          </div>
        </div>
        <Textarea
          placeholder="Enter description"
          name="description"
          value={localDescription}
          onChange={handleTextareaChange}
        />
      </div>
    </div>
  );
};

export default DescriptionComponent;
