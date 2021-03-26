import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaTimes, FaLink, FaGithub, FaLinkedin } from 'react-icons/fa'

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


  const [modal1IsOpen, setOpenModal1] = useState(false);
  const [modal2IsOpen, setOpenModal2] = useState(false);
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




    if ((codField.value.trim() === '') || (phoneField.value.trim() === '') || (messageField.value.trim() === '') ||
      (codField.value.length < 2) || (phoneField.value.length < 9)) {
      alert('Preencha Todos Campos Para Prosseguir!')
      codField.focus()
    }
    else {
      let codNumber = localStorage.getItem('codNumber')
      let phoneNumber = localStorage.getItem('phoneNumber')
      let message = localStorage.getItem('messageField')
      let LinkApi = 'web.whatsapp.com/send?phone=';
      let LinkGerated = `${LinkApi}55${codNumber}${phoneNumber}&text=${message}&app_absent=0`;
      localStorage.setItem('link', LinkGerated)
      setOpenModal1(true)
      setLink(LinkGerated)
      document.title = 'Link | WhatsApp Link Generator'
    }


  }

  function ClearFields() {
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


  function CloseModal1() {
    setOpenModal1(false)
    setCopy(false)
    document.title = 'Home | WhatsApp Link Generator'
  }


  function helpButton() {
    setOpenModal2(true)
    document.title = 'Ajuda | WhatsApp Link Generator'
  }

  function CloseModal2() {
    setOpenModal2(false)
    document.title = 'Home | WhatsApp Link Generator'
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
            <p>
              Gere Um Link Para o WhatsApp. Ótima Ferramenta para ações de Marketing e
              Relacionamento. Com o Link gerado você poderá utilizá-lo
              de diversas formas:campanhas, redes sociais, email marketing, banners e etc.
            </p>
          </div>
        </div>

        <footer>
          <div className={container_left.container_footer}>
            <div className={container_left.content}>
              <div className={container_left.links_footer}>
                <a href="https://github.com/miguelhp373/WhatsApp_Link_Generator" target="_blank">
                  <span>
                    <FaGithub />
                  &nbsp;
                  GitHub
                </span>
                </a>
                <br />
                <a href="https://www.linkedin.com/in/miguel-henrique-pereira-b466921b0/" target="_blank">
                  <span>
                    <FaLinkedin />
                  &nbsp;
                  Linkedin
                </span>
                </a>
              </div>
              <br />
              <span>&copy;miguelhp - 2021</span>
            </div>
          </div>
        </footer>

      </div>
      <div className={container_right.right_main_container}>
        <div className={container_right.help}>
          <button onClick={helpButton}>Ajuda</button>
        </div>
        <Modal
          isOpen={modal2IsOpen}
          onRequestClose={() =>
            setOpenModal2(false)
          }
          style={ModalStyle}
        >
          <button onClick={CloseModal2} className={ModalStyles.buttonClose}><FaTimes /></button>
          <h1 className={ModalStyles.titleHelp}>Como Funciona</h1>
          <div className={ModalStyles.container}>
            <div className={ModalStyles.contentModal}>
              <ol>
                <li>Insira o nº do WhatsApp Ex: 11 9 9999-9999</li>
                <li>Escreva a mensagem padrão que será exibida</li>
                <li>Clique em “GERAR LINK”</li>
                <li>Copie o link e compartilhe</li>
                <li>Antes de usar, faça o teste</li>
              </ol>
            </div>
          </div>
        </Modal>

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
                  isOpen={modal1IsOpen}
                  onRequestClose={() =>
                    setOpenModal1(false)
                  }
                  style={ModalStyle}
                >
                  <button onClick={CloseModal1} className={ModalStyles.buttonClose}><FaTimes /></button>
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
            <br />
            <div className={container_right.warning}>
              <span>Não guardamos nenhum dado informado.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
