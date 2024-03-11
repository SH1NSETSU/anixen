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
      <UrlPreview
        url="https://anixen.vercel.app/"
        title="aniXen"
        description="AniXen is an anime streaming platform."
        image="https://github.com/g0T-h/anixen/raw/main/public/FNLogo.png" // You can replace this with the actual image URL
        />
    </Container>
  );
}

export default App;
