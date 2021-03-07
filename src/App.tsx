

import global from '../src/styles/global.module.css';
import container_left from '../src/styles/container-left/container.module.css';
import container_right from '../src/styles/container-right/container.module.css';

/* import Modal from '../src/components/modal' */

function App() {

  

  return (
    <div className={global.container}>
      
      <div className={container_left.left_main_container}>
        
         <div className={container_left.title}>
           <div className={container_left.content}>
             <img src="assets/whatsapp_icon.webp" alt="WhatsApp Logo"/>
            <h1>WhatsApp Link Generator</h1>
           </div>
         </div>

        <div className={container_left.text_welcome}>
          <div className={container_left.content}>
            <h1>Bem Vindo</h1>
            <p>Gere Um Link Para o Seu <br/>
              WhatsApp, Inserindo o Numero e <br/>
              A Mensagem que pessoa enviará <br/>
              sempre que utilizar seu link
            </p>
          </div>
        </div>

        <footer>
          <span>&copy;miguelhp - 2021</span>
        </footer>

      </div> 
      <div className={container_right.right_main_container}>
        
        <div className={container_right.title}>
          <h1>Insira as Informações</h1>
        </div>

        <div className={container_right.form_container}>
          <div className={container_right.content}>
              
              <div className={container_right.field_number_phone}>
                <input type="text" name="ddd" id="ddd_number" className={container_right.field_ddd} placeholder='DDD' maxLength={2}/>
                <input type="text" name="number-phone" id="phone_number" className={container_right.field_phone} placeholder='NÚMERO' maxLength={9}/>
              </div>

              <div className={container_right.field_text_area}>
                  <textarea id='message_field' className={container_right.message_field} placeholder='Mensagem'/>
              </div>

              <div className={container_right.button_submit_generator}>
                  <button >Gerar Link</button>
                   
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
