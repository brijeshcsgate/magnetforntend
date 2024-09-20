import { largeListenButton, largeMicButton } from '@/assets/Icons';
import React, { useState, useRef, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';

const AudioRecorder = ({ audioFile, onAudioRecorded }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(audioFile || null); // If audioFile is passed, set it as the initial value
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const audioChunksRef = useRef([]);
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioDuration, setAudioDuration] = useState(null);

  // Initialize WaveSurfer instance
  useEffect(() => {
    if (audioURL) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#ddd',
        progressColor: 'gray',
        cursorColor: 'gray',
        cursorWidth: 3,
        height: 60,
        // responsive: true,
        barGap: 3,
        barHeight: 5,
        barWidth: 3,
        barRadius: 3,
        // width:'50%'
      });
      wavesurfer.current.load(audioURL);

      wavesurfer.current.on('ready', () => {
        setAudioDuration(wavesurfer.current.getDuration());
      });

      wavesurfer.current.on('finish', () => {
        setIsPlaying(false);
      });

      return () => wavesurfer.current.destroy();
    }
    console.log(audioURL, 'audioURL');
    
  }, [audioURL]);

  const startRecording = async () => {
    setIsRecording(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        if (audioChunksRef.current.length > 0) {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: 'audio/mpeg',
          });
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioURL(audioUrl);
          audioChunksRef.current = [];

          // Send the recorded audio back to the parent component
          if (onAudioRecorded) {
            onAudioRecorded(audioBlob);
          }
        } else {
          console.error('No audio data was recorded');
        }
      };

      mediaRecorder.start();
    } catch (error) {
      console.error('Error accessing media devices.', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    }
  };

  const togglePlayPause = () => {
    if (wavesurfer.current) {
      if (isPlaying) {
        wavesurfer.current.pause();
      } else {
        wavesurfer.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const formattedDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setAudioDuration((prev) => (prev > 0 ? prev - 1 : 0)); // Decrease by 1 each second
  //   }, 1000);

  //   // Cleanup the interval when the component unmounts
  //   return () => clearInterval(interval);
  // }, []);
  return (
    <div className="audio-recorder flex align-middle items-center justify-between">
      {!audioFile && (
        <div onClick={isRecording ? stopRecording : startRecording}>
          {isRecording ? largeListenButton({}) : largeMicButton({})}
        </div>
      )}
      {audioURL && (
        <div className="audio-player">
          <div className="waveform-container">
            <button className="play-pause-btn" onClick={togglePlayPause}>
              {isPlaying ? '❚❚' : '►'}
            </button>
            <div ref={waveformRef} className="waveform"></div>
          </div>
          <div className="audio-info">
            <span>{formatTime(audioDuration)}</span>
            <span>{formattedDate}</span>
          </div>
        </div>
      )}
      <style jsx>{`
        .audio-recorder {
          text-align: center;
          font-family: Arial, sans-serif;
          margin: 20px;
          align-items: center;
          justify-content: center;
          gap: 50px;
        }
        .audio-player {
          margin-top: 20px;
        }
        .waveform-container {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 10px;
        }
        .waveform {
          width: 250px;
          height: 70px;
          margin-left: 20px;
        }
        .play-pause-btn {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
        }
        .audio-info {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          font-size: 14px;
          color: #555;
        }
      `}</style>
    </div>
  );
};

export default AudioRecorder;
