import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Features from './pages/Features';
import Pricing from './pages/Pricing';

const App = () => {
  return (
    <main>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/features" component={Features} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </main>
  );
};

export default App;
