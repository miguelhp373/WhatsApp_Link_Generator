import React, { useEffect, useState } from 'react';
import Modal from 'react-modal'
import { FaTimes, FaLink } from 'react-icons/fa'

import global from '../src/styles/global.module.css';
import container_left from '../src/styles/container-left/container.module.css';
import container_right from '../src/styles/container-right/container.module.css';
import ModalStyles from '../src/styles/components/modal.module.css'



Modal.setAppElement('#root')




interface FieldsInput{
  codNumber: string;
  phoneNumber: string;
  messageField: string;
}



function App() {

  const ModalStyle = {
    overlay: {
      background: '#FFFF'
    },
    content: {
      background: '#dfe6ed',
      width: '45%',
      height: '50%',
      top: '15%',
      left: '25%',
      align: 'center',
      borderRadius: '5px'
    },
    contentModal: {
      display: 'flex',
      flexDirection: 'column'
    }

  }
 


  const FieldInitialValues = {
    codNumber: '',
    phoneNumber:'',
    messageField: ''
  }

  const [modalIsOpen, setOpenModal] = useState(false);
  const [values, setValues] = useState({FieldInitialValues})


  function onChange(ev:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>){
    const { id, value } = ev.currentTarget
  
    localStorage.setItem(id, value)
  
    setValues({
      ...values,
      [id]: value
    })
  }

  function LinkCreate() {
    
    let codNumber = localStorage.getItem('codNumber')
    let phoneNumber = localStorage.getItem('phoneNumber')
    let message = localStorage.getItem('messageField')
    let LinkApi = 'wa.me/';
    let LinkGerated = `${LinkApi}55${codNumber}${phoneNumber}?text=${message}`;
    console.log(LinkGerated)
    localStorage.setItem('link',LinkGerated);
    setOpenModal(true)

  }

  function CloseModal() {
    setOpenModal(false)
  }

/*  function CopyLink(){
  var setLink = {(<HTMLInputElement>)document.getElementById('linkCopy').value} //parei aqui
    
}  */



  return (
    <div className={global.container}>

      <div className={container_left.left_main_container}>

        <div className={container_left.title}>
          <div className={container_left.content}>
            <img src="assets/whatsapp_icon.webp" alt="WhatsApp Logo" />
            <h1>WhatsApp Link Generator</h1>
          </div>
        </div>

        <div className={container_left.text_welcome}>
          <div className={container_left.content}>
            <h1>Bem Vindo</h1>
            <p>Gere Um Link Para o Seu <br />
              WhatsApp, Inserindo o Numero e <br />
              A Mensagem que pessoa enviará <br />
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
              <input type="text" name="ddd" id="codNumber" className={container_right.field_ddd} placeholder='DDD' maxLength={2} 
              onChange={onChange}
              required
             />
              <input type="text" name="number-phone" id="phoneNumber" className={container_right.field_phone} placeholder='NÚMERO' maxLength={9} 
              onChange={onChange}
              required
              />
            </div>

            <div className={container_right.field_text_area}>
              <textarea id='messageField' className={container_right.message_field} placeholder='Mensagem' onChange={onChange} required/>
            </div>

            <div className={container_right.button_submit_generator}>
              <button onClick={LinkCreate} >Gerar Link</button>



              <Modal
                isOpen={modalIsOpen}
                onRequestClose={() =>
                  setOpenModal(false)
                }
                style={ModalStyle}
              >
                <button onClick={CloseModal} className={ModalStyles.buttonClose}><FaTimes /></button>
                <h1 className={ModalStyles.title}>Link Gerado</h1>
                  <div className={ModalStyles.container}>
                   <div className={ModalStyles.contentModal}>
                    
                    <input type="text" id='linkCopy' className={ModalStyles.linkField} />
                   
                    <button
                       /* onClick={CopyLink} */
                      className={ModalStyles.buttonLink}>
                      <FaLink style={{ paddingTop: '2px' }} />
                      &nbsp;
                      <span>
                        Copiar Link
                      </span>
                    </button>
                 
                  </div>
                </div>
              </Modal>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
