// // import React from 'react';
// // import { ReactMediaRecorder } from 'react-media-recorder';
// // import { Button, Space } from 'antd';

// // export default function VideoRecorder({ onComplete }) {
// //   return (
// //     <ReactMediaRecorder
// //       video
// //       audio
// //       render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
// //         <div>
// //           <p>Status: {status}</p>
// //           <Space>
// //             <Button type="primary" onClick={startRecording}>
// //               Start
// //             </Button>
// //             <Button danger onClick={() => {
// //               stopRecording();
// //               onComplete(mediaBlobUrl);
// //             }}>
// //               Stop
// //             </Button>
// //           </Space>
// //           {mediaBlobUrl && (
// //             <video src={mediaBlobUrl} controls width="100%" style={{ marginTop: 16 }} />
// //           )}
// //         </div>
// //       )}
// //     />
// //   );
// // }

// import React, { useRef, useEffect } from 'react';
// import { ReactMediaRecorder } from 'react-media-recorder';
// import { Button, Space } from 'antd';

// export default function VideoRecorder({ onComplete }) {
//   const previewVideoRef = useRef(null);

//   return (
//     <ReactMediaRecorder
//       video
//       audio
//       render={({
//         status,
//         startRecording,
//         stopRecording,
//         mediaBlobUrl,
//         previewStream,
//       }) => {
//         // Whenever previewStream changes, hook it up to the video element:
//         useEffect(() => {
//           if (previewVideoRef.current && previewStream) {
//             previewVideoRef.current.srcObject = previewStream;
//           }
//         }, [previewStream]);

//         return (
//           <div>
//             {/* Live Preview */}
//             <video
//               ref={previewVideoRef}
//               autoPlay
//             //   muted
//               playsInline
//               style={{ width: '100%', borderRadius: 8, background: '#000' }}
//             />

//             <Space style={{ marginTop: 12 }}>
//               <Button
//                 type="primary"
//                 onClick={startRecording}
//                 disabled={status === 'recording'}
//               >
//                 Start
//               </Button>

//               <Button
//                 danger
//                 onClick={() => {
//                   stopRecording();
//                   onComplete(mediaBlobUrl);
//                 }}
//                 disabled={status !== 'recording'}
//               >
//                 Stop
//               </Button>
//             </Space>

//             {/* Playback after stopping */}
//             {mediaBlobUrl && (
//               <video
//                 src={mediaBlobUrl}
//                 controls
//                 style={{ width: '100%', marginTop: 16, borderRadius: 8 }}
//               />
//             )}
//           </div>
//         );
//       }}
//     />
//   );
// }

// src/components/VideoRecorder.jsx
// {
// import React, { useRef, useEffect } from 'react';
// import { ReactMediaRecorder } from 'react-media-recorder';
// import { Button, Space } from 'antd';

// export default function VideoRecorder({ onComplete }) {
//   const previewRef = useRef(null);

//   return (
//     <ReactMediaRecorder
//       video
//       audio
//       render={({
//         status,
//         startRecording,
//         stopRecording,
//         mediaBlobUrl,
//         previewStream,
//       }) => {
//         // Attach the live preview stream to our <video> element
//         useEffect(() => {
//           if (previewRef.current && previewStream) {
//             previewRef.current.srcObject = previewStream;
//           }
//         }, [previewStream]);

//         return (
//           <div>
//             {/* Live preview always visible */}
//             <video
//               ref={previewRef}
//               autoPlay
//               muted
//               playsInline
//               style={{
//                 width: '100%',
//                 height: '240px',
//                 background: '#000',
//                 borderRadius: 8,
//                 objectFit: 'cover',
//               }}
//             />

//             <Space style={{ marginTop: 12 }}>
//               <Button
//                 type="primary"
//                 onClick={startRecording}
//                 disabled={status === 'recording'}
//               >
//                 Start
//               </Button>
//               <Button
//                 danger
//                 onClick={() => {
//                   stopRecording();
//                   onComplete(mediaBlobUrl);
//                 }}
//                 disabled={status !== 'recording'}
//               >
//                 Stop
//               </Button>
//             </Space>

//             {/* Playback appears below live preview once you’ve recorded */}
//             {mediaBlobUrl && (
//               <video
//                 src={mediaBlobUrl}
//                 controls
//                 style={{
//                   width: '100%',
//                   marginTop: 16,
//                   borderRadius: 8,
//                 }}
//               />
//             )}
//           </div>
//         );
//       }}
//     />
//   );
// }
// }

// // src/components/VideoRecorder.jsx
// {
// import React, { useRef, useEffect } from 'react';
// import { useReactMediaRecorder } from 'react-media-recorder';
// import { Button, Space } from 'antd';

// export default function VideoRecorder({ onComplete }) {
//   const previewRef = useRef(null);

//   // Use the hook API so hooks can live in component body
//   const {
//     status,
//     startRecording,
//     stopRecording,
//     previewStream,
//     mediaBlobUrl,
//   } = useReactMediaRecorder({ video: true, audio: true });

//   // Whenever previewStream updates, attach it to the <video> ref
//   useEffect(() => {
//     if (previewRef.current && previewStream) {
//       previewRef.current.srcObject = previewStream;
//     }
//   }, [previewStream]);

//   return (
//     <div>
//       {/* Live Preview ALWAYS visible */}
//       <video
//         ref={previewRef}
//         autoPlay
//         muted
//         playsInline
//         style={{
//           width: '100%',
//           height: '240px',
//           background: '#000',
//           borderRadius: 8,
//           objectFit: 'cover',
//         }}
//       />

//       <Space style={{ marginTop: 12 }}>
//         <Button
//           type="primary"
//           onClick={startRecording}
//           disabled={status === 'recording'}
//         >
//           Start
//         </Button>

//         <Button
//           danger
//           onClick={() => {
//             stopRecording();
//             onComplete(mediaBlobUrl);
//           }}
//           disabled={status !== 'recording'}
//         >
//           Stop
//         </Button>
//       </Space>

//       {/* Playback after stopping */}
//       {mediaBlobUrl && (
//         <video
//           src={mediaBlobUrl}
//           controls
//           style={{
//             width: '100%',
//             marginTop: 16,
//             borderRadius: 8,
//           }}
//         />
//       )}
//     </div>
//   );
// }
// }

// src/components/VideoRecorder.jsx
import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Button, Space } from 'antd';

export default function VideoRecorder({ onComplete }) {
  const webcamRef      = useRef(null);
  const mediaRecorder  = useRef(null);
  const [recording, setRecording] = useState(false);
  const [videoUrl, setVideoUrl]   = useState(null);
  const [chunks, setChunks]       = useState([]);

  // Called when data is available
  const handleData = useCallback(
    (e) => {
      if (e.data && e.data.size > 0) {
        setChunks((prev) => prev.concat(e.data));
      }
    },
    [setChunks]
  );

  const startRecording = useCallback(() => {
    setChunks([]);
    setVideoUrl(null);
    if (!webcamRef.current) return;

    const stream = webcamRef.current.stream;
    const recorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp9' });
    mediaRecorder.current = recorder;
    recorder.ondataavailable = handleData;
    recorder.start();
    setRecording(true);
  }, [webcamRef, handleData]);

  const stopRecording = useCallback(() => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url  = URL.createObjectURL(blob);
        setVideoUrl(url);
        onComplete(url, blob);
      };
    }
    setRecording(false);
  }, [chunks, onComplete]);

  return (
//     <div>
//       {/* Always‑on live preview */}
//       <Webcam
//         audio
//         ref={webcamRef}
//         mirrored
//         videoConstraints={{ facingMode: 'user' }}
//         style={{ width: '80%',height: 'auto',
//  borderRadius: 8, background: '#000' }}
//       />

//       <Space style={{ marginTop: 12 }}>
//         <Button type="primary" onClick={startRecording} disabled={recording}>
//           Start
//         </Button>
//         <Button danger onClick={stopRecording} disabled={!recording}>
//           Stop
//         </Button>
//       </Space>

//       {/* Playback of recorded clip */}
//       {videoUrl && (
//         <video
//           src={videoUrl}
//           controls
//           style={{ width: '100%', marginTop: 16, borderRadius: 8 }}
//         />
//       )}
//     </div>

<div style={{ textAlign: 'center' }}>
  {/* Webcam Preview with reduced size */}
  <Webcam
    audio
    ref={webcamRef}
    mirrored
    videoConstraints={{ facingMode: 'user' }}
    style={{
      width: '480px',  // reduce size here
      borderRadius: 8,
      background: '#000',
    }}
  />

  {/* Centered Buttons on new line */}
  <div style={{ marginTop: 12 }}>
    <Space>
      <Button type="primary" onClick={startRecording} disabled={recording}>
        Start
      </Button>
      <Button danger onClick={stopRecording} disabled={!recording}>
        Stop
      </Button>
    </Space>
  </div>

  {/* Playback video */}
  {/* {videoUrl && (
    <video
      src={videoUrl}
      controls
      style={{
        width: '280px',
        marginTop: 16,
        borderRadius: 8,
      }}
    />
  )} */}
</div>

  );
}
