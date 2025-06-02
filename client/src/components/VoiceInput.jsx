import React, { useRef, useEffect, useState } from 'react';
import { Button, message } from 'antd';
import { AudioOutlined } from '@ant-design/icons';


export default function VoiceInput({ onResult }) {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      message.error('Speech Recognition not supported in this browser.');
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = 'en-US';
    recognitionRef.current.interimResults = false;

    recognitionRef.current.onstart = () => setListening(true);
    recognitionRef.current.onend = () => setListening(false);

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
      message.success('Transcription complete!');
    };
  }, [onResult]);

  const start = () => recognitionRef.current?.start();

  return (
  <Button
  type="dashed"
  onClick={start}
  disabled={listening}
  icon={<AudioOutlined />}
>
  {listening ? 'Listening...' : 'Start Voice Input'}
</Button>

  );
}
