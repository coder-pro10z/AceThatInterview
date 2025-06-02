import VideoRecorder from '../components/VideoRecorder';

export default function UserWebcam({ onComplete }) {
  return <VideoRecorder onComplete={onComplete} />;
}
// This component wraps the VideoRecorder component to handle user webcam input.
// It passes the onComplete callback to handle the completion of video recording.