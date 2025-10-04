import Header from './components/Header';
import HeroSection from './components/HeroSection';
import KeyMetrics from './components/KeyMetrics';
import ArchitectureSection from './components/ArchitectureSection';
import ProgressCharts from './components/ProgressCharts';
import RoadmapTimeline from './components/RoadmapTimeline';
import LiveAPIDemo from './components/LiveAPIDemo';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />
      <HeroSection />
      <KeyMetrics />
      <ArchitectureSection />
      <ProgressCharts />
      <RoadmapTimeline />
      <LiveAPIDemo />
      <Footer />
    </div>
  );
}

export default App;
