// App.jsx
import './App.css';
import { Container } from 'react-bootstrap';
import MainPage from './components/MainPage';
import UrlPreview from '../UrlPreview'; // Import the UrlPreview component

function App() {
  return (
    <Container>
      <MainPage />
      {/* Example usage of UrlPreview component */}
      <UrlPreview url="https://anixen.vercel.app/" />
    </Container>
  );
}

export default App;
