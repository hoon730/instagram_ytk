import './App.css';
import GlobalStyles from './styles/GlobalStyles';
import Button from './components/common/Button';

function App() {
  return (
    <>
      <GlobalStyles/>
      <div className="App">
        <Button  text={"업로드"} type={"positive"}/>
      </div>
    </>
  );
}

export default App;
