'use client';

import React from 'react';
import bgVideoFeed from '../images/bg-video-feed.png';
import Image from 'next/image';

export default function VideoFeed() {
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const [streamStatus, setStreamStatus] = React.useState({
        isActive: false,
        error: false
    });

    React.useEffect(() => {
        async function initWebRTC() {
            try {
                const pc = new RTCPeerConnection({
                    iceServers: [{urls: 'stun:stun.l.google.com:19302'}]
                });

                // Add video transceiver for receiving
                pc.addTransceiver('video', {direction: 'recvonly'});
                pc.addTransceiver('audio', {direction: 'recvonly'});

                // Set up video stream
                if (videoRef.current) {
                    videoRef.current.srcObject = new MediaStream();
                }

                // Handle incoming tracks
                pc.ontrack = (event) => {
                    if (videoRef.current && videoRef.current.srcObject instanceof MediaStream) {
                        videoRef.current.srcObject.addTrack(event.track);
                    }
                };

                // Connect to WebSocket
                const wsUrl = process.env.NEXT_PUBLIC_WEBRTC_WS_URL || 'wss://localhost:8080';
                const ws = new WebSocket(wsUrl);

                ws.onopen = () => {
                    // Handle ICE candidates
                    pc.onicecandidate = (event) => {
                        if (!event.candidate) return;
                        const msg = {type: 'webrtc/candidate', value: event.candidate.candidate};
                        ws.send(JSON.stringify(msg));
                    };

                    // Create and send offer
                    pc.createOffer()
                        .then(offer => pc.setLocalDescription(offer))
                        .then(() => {
                            const msg = {type: 'webrtc/offer', value: pc.localDescription?.sdp};
                            ws.send(JSON.stringify(msg));
                        });
                };

                // Handle incoming WebSocket messages
                ws.onmessage = (event) => {
                    const msg = JSON.parse(event.data);
                    if (msg.type === 'webrtc/candidate') {
                        pc.addIceCandidate({candidate: msg.value, sdpMid: '0'});
                    } else if (msg.type === 'webrtc/answer') {
                        pc.setRemoteDescription({type: 'answer', sdp: msg.value});
                    }
                };

                ws.onerror = () => {
                    setStreamStatus({ isActive: false, error: true });
                };

            } catch (error) {
                console.error('WebRTC initialization failed:', error);
                setStreamStatus({ isActive: false, error: true });
            }
        }

        initWebRTC();
    }, []);

    // Add useEffect for connection timeout
    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (!streamStatus.isActive && !streamStatus.error) {
                setStreamStatus({ isActive: false, error: true });
            }
        }, 10000); // 10 second timeout

        return () => clearTimeout(timeoutId);
    }, [streamStatus.isActive, streamStatus.error]);

    const handleVideoError = () => {
        setStreamStatus({ isActive: false, error: true });
    };

    const handleVideoPlaying = () => {
        setStreamStatus({ isActive: true, error: false });
    };

    return (
      <div className="w-[95vw] sm:w-[80vw] md:w-[70vw] lg:w-[60vw] divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm">
        <div className="px-4 py-5 sm:p-6 relative">
          {(!streamStatus.isActive || streamStatus.error) && (
            <div className="absolute inset-0 flex items-center justify-center backdrop-blur-[40px] bg-black/40 rounded-t-md z-10">
              <Image 
                src={bgVideoFeed}
                alt="Background"
                fill
                className="object-cover -z-10 animate-blur-pulse"
                priority
              />
              {streamStatus.error ? (
                <div className="text-white text-center">
                  <svg className="w-12 h-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p>Stream Error</p>
                </div>
              ) : (
                <div className="text-white text-center">
                  <svg className="animate-spin w-12 h-12 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p>Connecting...</p>
                </div>
              )}
            </div>
          )}
          <video
            ref={videoRef}
            className="w-full rounded-t-md"
            autoPlay
            playsInline
            muted
            onError={handleVideoError}
            onPlaying={handleVideoPlaying}
          />
        </div>
        <div className="px-4 py-4 sm:px-6">
          <div className="flex items-center">
            <div className={`h-2.5 w-2.5 rounded-full ${
                streamStatus.error ? 'bg-red-500' : 
                streamStatus.isActive ? 'bg-green-500' : 
                'bg-yellow-500'
            } mr-2`}></div>
            <span className="text-sm text-gray-500">
                {streamStatus.error ? 'Stream Error' :
                 streamStatus.isActive ? 'Live Stream Active' :
                 'Connecting...'}
            </span>
          </div>
        </div>
      </div>
    )
  }
  