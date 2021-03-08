import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaTimes, FaLink } from 'react-icons/fa'

import global from '../src/styles/global.module.css';
import container_left from '../src/styles/container-left/container.module.css';
import container_right from '../src/styles/container-right/container.module.css';
import ModalStyles from '../src/styles/components/modal.module.css'


Modal.setAppElement('#root')


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
    phoneNumber: '',
    messageField: ''
  }


  const [modalIsOpen, setOpenModal] = useState(false);
  const [values, setValues] = useState({ FieldInitialValues })
  const [link, setLink] = useState('')
  const [copy, setCopy] = useState(false)


  function getValueToField(ev: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
    const { id, value } = ev.currentTarget

    localStorage.setItem(id, value)

    setValues({
      ...values,
      [id]: value
    })
  }

  function LinkCreate() {
    let codField = (document.getElementById('codNumber') as HTMLInputElement)
    let phoneField = (document.getElementById('phoneNumber') as HTMLInputElement)
    let messageField = (document.getElementById('messageField') as HTMLInputElement)
    
    
    

    if((codField.value === '')||(phoneField.value === '')||(messageField.value === '')){
     alert('Preencha Todos Campos Para Prosseguir!')
    }else{
      let codNumber = localStorage.getItem('codNumber')
      let phoneNumber = localStorage.getItem('phoneNumber')
      let message = localStorage.getItem('messageField')
      let LinkApi = 'wa.me/';
      let LinkGerated = `${LinkApi}55${codNumber}${phoneNumber}?text=${message}&app_absent=0`;
      localStorage.setItem('link', LinkGerated)
      setOpenModal(true)
      setLink(LinkGerated)
    }


  }

  function ClearFields(){
    let cod = (document.getElementById('codNumber') as HTMLInputElement)
    let phone = (document.getElementById('phoneNumber') as HTMLInputElement)
    let message = (document.getElementById('messageField') as HTMLInputElement)
    cod.value = ''
    phone.value = ''
    message.value = ''
  }


  function CopyLink() {
    (document.getElementById('linkCopy') as HTMLInputElement).select();
    document.execCommand('copy')
    setCopy(true)
  }


  function CloseModal() {
    setOpenModal(false)
    setCopy(false)
  }


  return (

    <div className={global.container}>
      <div className={container_left.left_main_container}>

        <div className={container_left.title}>
          <div className={container_left.content}>
            <img src="assets/logo.svg" alt="WhatsApp Logo" />
            <h1>WhatsApp Link Generator</h1>
          </div>
        </div>

        <div className={container_left.text_welcome}>
          <div className={container_left.content}>
            <h1>Bem Vindo</h1>
            <p>Gere Um Link Para o Seu <br />
              WhatsApp, Inserindo o Numero e <br />
              A Mensagem que pessoa enviará <br />
              sempre que utilizar seu link.
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
                onChange={getValueToField}
                required
              />
              <input type="text" name="number-phone" id="phoneNumber" className={container_right.field_phone} placeholder='NÚMERO' maxLength={9}
                onChange={getValueToField}
                required
              />
            </div>

            <div className={container_right.field_text_area}>
              <textarea id='messageField' className={container_right.message_field} placeholder='Mensagem' onChange={getValueToField} required />
            </div>

            <br />

            <div className={container_right.buttonContainer}>
              <div className={container_right.button_submit_generator}>
                <button onClick={LinkCreate} className={container_right.btnGenerated}>Gerar Link</button>
                <button onClick={ClearFields} className={container_right.newLink} >Novo Link</button>



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

                      <input type="text" id='linkCopy' value={link} className={ModalStyles.linkField} />

                      <button

                        onClick={CopyLink}

                        className={ModalStyles.buttonLink}>
                        <FaLink style={{ paddingTop: '2px' }} />
                      &nbsp;
                      <span>
                          {copy ? ('Copiado') : ('Copiar Link')}
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
    </div>
  );
}

export default App;
