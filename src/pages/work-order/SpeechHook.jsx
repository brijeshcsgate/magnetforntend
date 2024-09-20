import { useState, useEffect } from 'react';

const useSpeechRecognition = () => {
    const [transcript, setTranscript] = useState('');
    const [isListening, setIsListening] = useState(false);

    useEffect(() => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event) => {
            const newTranscript = Array.from(event.results)
                .map(result => result[0].transcript)
                .join('');
            setTranscript(newTranscript);
        };

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);

        if (isListening) {
            recognition.start();
        } else {
            recognition.stop();
        }

        return () => recognition.stop(); // Cleanup on unmount
    }, [isListening]);

    return { transcript, isListening, setIsListening, setTranscript };
};

export default useSpeechRecognition;
