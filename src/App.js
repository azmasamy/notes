import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import NotesList from "./pages/NotesList";
import Note from "./pages/Note";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <Router>
      <div className="container dark">
        <div className="app">
          <Header />
          <Routes>
            <Route exact path="/" element={<NotesList />} />
            <Route path="/note/:noteId" element={<Note />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
