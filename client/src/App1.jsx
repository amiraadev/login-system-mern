import './App.css';

function App() {
  return (

      <div class="card">
         <div class="card-info">
            <div className="form-control">  

                <div className='div-control'>                 
                  <input required type="text" name='username'/>
                  <label htmlFor='username'>
                    <span style={{ transitionDelay: '350ms' }}>U</span>
                    <span style={{ transitionDelay: '300ms' }}>s</span>
                    <span style={{ transitionDelay: '250ms' }}>e</span>
                    <span style={{ transitionDelay: '200ms' }}>r</span>
                    <span style={{ transitionDelay: '150ms' }}>n</span>
                    <span style={{ transitionDelay: '100ms' }}>a</span>
                    <span style={{ transitionDelay: '50ms' }}>m</span>
                    <span style={{ transitionDelay: '0ms' }}>e</span>
                  </label>
                </div>  

               <div className='div-control'>
                <input required type="password" name='password' />
                <label htmlFor='password'>
                  <span style={{ transitionDelay: '350ms' }}>p</span>
                  <span style={{ transitionDelay: '300ms' }}>a</span>
                  <span style={{ transitionDelay: '250ms' }}>s</span>
                  <span style={{ transitionDelay: '200ms' }}>s</span>
                  <span style={{ transitionDelay: '150ms' }}>w</span>
                  <span style={{ transitionDelay: '100ms' }}>o</span>
                  <span style={{ transitionDelay: '50ms' }}>r</span>
                  <span style={{ transitionDelay: '0ms' }}>d</span>
                </label>
               </div>

               <div className='div-button'>
                  <button> I'M READY</button>
               </div>
          </div>
              </div>
    </div>


  );
}

export default App;
