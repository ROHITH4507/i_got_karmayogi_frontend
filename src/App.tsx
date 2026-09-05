import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from '@/components/ui/Toast';
import AppLayout from '@/layouts/AppLayout';
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import Dashboard from '@/pages/Dashboard';
import MyLearning from '@/pages/MyLearning';
import PersonalizedPath from '@/pages/PersonalizedPath';
import Explore from '@/pages/Explore';
import AIAssistantPage from '@/pages/AIAssistantPage';
import UploadMaterial from '@/pages/UploadMaterial';
import MaterialSummary from '@/pages/MaterialSummary';
import Quiz from '@/pages/Quiz';
import QuizExperience from '@/pages/QuizExperience';
import QuizResults from '@/pages/QuizResults';
import MCQGenerator from '@/pages/MCQGenerator';
import InteractiveLearning from '@/pages/InteractiveLearning';
import Progress from '@/pages/Progress';
import Leaderboard from '@/pages/Leaderboard';
import Achievements from '@/pages/Achievements';
import IGotKarmayogi from '@/pages/IGotKarmayogi';
import Notifications from '@/pages/Notifications';
import Profile from '@/pages/Profile';
import Settings from '@/pages/Settings';

export default function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/learning" element={<MyLearning />} />
          <Route path="/learning/:courseId" element={<MyLearning />} />
          <Route path="/personalized-path" element={<PersonalizedPath />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/ai-assistant" element={<AIAssistantPage />} />
          <Route path="/upload-material" element={<UploadMaterial />} />
          <Route path="/materials/:materialId" element={<UploadMaterial />} />
          <Route path="/materials/:materialId/summary" element={<MaterialSummary />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quiz/:quizId" element={<QuizExperience />} />
          <Route path="/quiz/:quizId/results" element={<QuizResults />} />
          <Route path="/mcq-generator" element={<MCQGenerator />} />
          <Route path="/interactive-learning" element={<InteractiveLearning />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/igot" element={<IGotKarmayogi />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ToastProvider>
  );
}
