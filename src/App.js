import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from "./components/Header";
import FeedbackList from "./components/FeedbackList";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";
import { FeedbackProvider } from "./context/FeedbackContext";
import AboutPage from "./components/shared/pages/AboutPage";
import AboutIconLink from "./components/AboutIconLink";
import Spinner from './components/shared/Spinner';


function App() {
    return (
        <FeedbackProvider>
            <Router>
            <Header />
            <div className="container">
                <Routes>
                    <Route exact path='/' element={
                        <>
                            <FeedbackForm/>
                            <FeedbackStats/>
                            <FeedbackList/>
                        </>
                    }>
                    </Route>
                    <Route path='/about' element={<AboutPage />}/>
                    
                </Routes>
                <AboutIconLink />
            </div>
        </Router>
        </FeedbackProvider>
    )
}

export default App;