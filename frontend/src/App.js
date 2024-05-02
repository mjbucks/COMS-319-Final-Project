import { ViewCharacters } from "./components/CharacterSelect";
import LoginForm from "./components/LoginForm";
import TitleText from "./components/TitleText";
import './styles/style.css';

function App() {
  return (
    <div className="App">
      <TitleText/>
      <div className="card-container">
        <LoginForm />
    </div>
    <ViewCharacters/>
    </div>
  );
}
export default App;
