import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatPage from '../components/pages/chat/page';
import PluginsPage from '../components/pages/plugins/page';
import VisualizationPage from '../components/pages/visualization/page';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/plugins" element={<PluginsPage />} />
        <Route path="/visualization" element={<VisualizationPage />} />
      </Routes>
    </Router>
  );
}