import { BrowserRouter as Router } from 'react-router';
import { Routings } from './lib/router/routings';
import { Layout } from './lib/layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routings />
      </Layout>
    </Router>
  );
}

export default App;
