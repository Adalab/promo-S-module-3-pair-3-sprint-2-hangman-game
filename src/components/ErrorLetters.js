import '../styles/Letters.scss';

const ErrorLetters =()=>{
    return (
    const renderErrorLetters = () => {
    const errorLetters = userLetters.filter(
      (letter) =>
        word.toLocaleLowerCase().includes(letter.toLocaleLowerCase()) === false
    );
    return errorLetters.map((letter, index) => {
      return (
        <li key={index} className='letter'>
          {letter}
        </li>
      );
    });
});
  };


  return(
    <div className='error'>
        <h2 className='title'>Letras falladas:</h2>
        <ul className='letters'>{renderErrorLetters()}</ul>
    </div>
    );
    
}

export default ErrorLetters;