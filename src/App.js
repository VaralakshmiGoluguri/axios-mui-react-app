import {Routes,Route} from 'react-router-dom'
import Home from './Components/Home';
import ViewPost from './Components/ViewPost'
import CreateEdit from './Components/CreateEdit'
import PageNotFound from './Components/PageNotFound';
function App() {
  return(
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='viewpost/:id' element={<ViewPost/>}></Route>
      <Route path='createedit' element={<CreateEdit />}>
        <Route path=':id' element={<CreateEdit />} />
      </Route>
      <Route path='*' element={<PageNotFound />}></Route>
    </Routes>
  );
}

export default App;
