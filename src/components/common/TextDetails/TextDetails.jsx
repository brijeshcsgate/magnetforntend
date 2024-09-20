import React from 'react';
import './TextDetailsOne.css';
import { spearker, spearkerWorking } from '@/assets/Icons';
import useTextToSpeech from '@/pages/issues/TextToSpeechHook';
import { Tooltip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { stringToColor } from '@/utils/Workshop.Issues.utils/issues.helper';

const TextDetailsOne = ({ details, title }) => {
  const { speak, isSpeaking } = useTextToSpeech();

  const handleSpeak = (value) => {
    speak(value);
  };

  return (
    <div className="text-details-one">
      <div className="text-details-title text-lg font-semibold text-gray-secondary">
        {title}
      </div>
      {details.map((detail, index) => {
        const names = Array.isArray(detail?.name) ? detail.name : [];

        return (
          <div className="text-detail-box" key={index}>
            <div
              className={`text-detail-box-title text-[13px] leading-5 text-gray-tertiary ${detail?.lastText ? '' : 'text-detail-box-title2'
                }`}
            >
              {detail?.title}
            </div>
            <div
              className={`text-detail-box-name flex justify-between text-[13px] leading-5 text-gray-secondary ${detail?.lastText ? '' : 'text-detail-box-name2'
                }`}
            >
              {!detail?.title.includes('Recording') && !detail?.title.includes('Watcher') && detail?.name}

              {detail?.title.includes('Watcher') && (
                <div className="cursor-pointer">
                  <Tooltip title={names.map((w) => w?.name?.english).join(', ')}>
                    <AvatarGroup max={3} sx={{ overflow: 'visible' }}>
                      {names.slice(0, 3).map((watcher, index) => (
                        <Avatar
                          key={index}
                          sx={{ bgcolor: stringToColor(watcher?.name?.english ?? '-') }}
                          alt={watcher?.name?.english}
                          src="/static/images/avatar/1.jpg" // Update this based on your data if needed
                        />
                      ))}
                      {names.length > 3 && (
                        <Avatar
                          sx={{
                            bgcolor: '#e0e0e0',
                            color: '#000',
                            width: 24,
                            height: 24,
                            fontSize: '14px',
                          }}
                          alt={`+${names.length - 3} more`}
                        >
                          +{names.length - 3}
                        </Avatar>
                      )}
                    </AvatarGroup>
                  </Tooltip>
                </div>
              )}

              {detail?.title.includes('Description') && (
                <div
                  className="cursor-pointer"
                  onClick={() => handleSpeak(detail?.name)}
                  disabled={isSpeaking}
                >
                  {isSpeaking ? spearkerWorking({}) : spearker({})}
                </div>
              )}

              {detail?.title.includes('Recording') && (
                <audio controls src={detail?.name}></audio>
              )}
            </div>

            {detail?.lastText && (
              <div className="text-detail-box-last-text text-[13px] leading-5 text-blue-primary-200 hover:underline cursor-pointer">
                {detail?.lastText}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TextDetailsOne;
