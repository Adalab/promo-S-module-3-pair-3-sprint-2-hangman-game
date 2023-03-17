import { useEffect, useState } from 'react';

// api
import getWordFromApi from '../services/api';
// styles
import '../styles/App.scss';
import '../styles/Dummy.scss';
import '../styles/Letters.scss';
import '../styles/Form.scss';
import '../styles/Header.scss';

//componentes y props
import Header from './Header';
import Dummy from './Dummy';
import SolutionsLetters from './SolutionsLetters';
import ErrorLetters from './ErrorLetters';
import Form from './Form';
import Footer from './Footer';

import {Route, Routes} from 'react-router-dom';
import Instructions from './Instructions';
import Options from './Options';

function App() {
  const [word, setWord] = useState('');
  const [userLetters, setUserLetters] = useState([]);
  const [lastLetter, setLastLetter] = useState('');

  useEffect(() => {
    getWordFromApi().then((word) => {
      setWord(word);
    });
  }, []);

  // events

  const handleKeyDown = (ev) => {
    // Sabrías decir para qué es esta línea
    ev.target.setSelectionRange(0, 1);
  };

  const handleChange = (ev) => {
    let re = /^[a-zA-ZñÑá-úÁ-Ú´]$/; //add regular pattern 
    if (re.test(ev.target.value) || ev.target.value === '') {
      handleLastLetter(ev.target.value);
    }
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  const getNumberOfErrors = () => {
    const errorLetters = userLetters.filter(
      (letter) => word.includes(letter) === false
    );
    return errorLetters.length;
  };

  
  const handleLastLetter = (value) => {
    value = value.toLocaleLowerCase();
    setLastLetter(value);

    if (!userLetters.includes(value)) {
      userLetters.push(value);
      setUserLetters([...userLetters]);
    }
  };

  return (
    <div className='page'>
      <Header/>
      <main className='main'>
        <section>
          <SolutionsLetters word ={word} userLetters={userLetters}/>
          <ErrorLetters word={word} userLetters={userLetters}/>
          <Form handleSubmit={handleSubmit} handleChange={handleChange} handleKeyDown={handleKeyDown} handleLastLetter={handleLastLetter}/>
        </section>
        <Dummy error={getNumberOfErrors()}/>
      </main>
      <Footer>
        <Routes>
          <Route path='/' />
          <Route path='/Instructions' element={<Instructions />} />
          <Route path='/Options' element={<Options />} />
        </Routes>
      </Footer>
    </div>
  );
}

export default App;
