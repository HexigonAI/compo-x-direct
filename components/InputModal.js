import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import styles from '../styles/InputModal.module.css';

const InputModal = ({
  isOpen,
  header,
  labelOne,
  labelTwo,
  buttonText,
  closeModal,
  handleSubmit,
}) => {
  if (!isOpen) return null;

  const [inputOne, setInputOne] = useState('');
  const [inputTwo, setInputTwo] = useState('');

  const handleCloseModal = (e) => {
    closeModal();
  };

  const handleOnSubmit = (e) => {
    handleSubmit(inputOne, inputTwo);
  };

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal_overlay} onClick={closeModal}></div>

      <div className={styles.modal_wrapper}>
        <div className={styles.modal_container}>

          <div className={styles.modal_header}>
            <div className={styles.modal_header__label}></div>
            <div className={styles.modal_header__heading}>{header}</div>
            <a
              style={{ cursor: 'pointer' }}
              onClick={(e) => handleCloseModal()}
              className={styles.modal_close}
            ></a>
          </div>

          <div className={styles.modal_content}>
            <div className='w-form'>
              <form
                id='email-form'
                name='email-form'
                data-name='Email Form'
                method='get'
              >
                
                <div className={styles.form_item}>
                  <label htmlFor='email' className='label'>
                    {labelOne}
                  </label>
                  <div className={styles.text_input_field_wrapper}>
                    <input
                      type='text'
                      value={inputOne}
                      onChange={(e) => setInputOne(e.target.value)}
                      className={styles.text_input}
                      maxLength='256'
                      name='text-input-default-2'
                      data-name='Text Input Default 2'
                      id='text-input-default-2'
                    />
                  </div>
                </div>

                <div className={styles.form_item}>
                  <label htmlFor='email' className='label'>
                    {labelTwo}
                  </label>
                  <div className={styles.text_input_field_wrapper}>
                    <input
                      type='text'
                      value={inputTwo}
                      onChange={(e) => setInputTwo(e.target.value)}
                      className={styles.text_input}
                      maxLength='256'
                      name='text-input-default-2'
                      data-name='Text Input Default 2'
                      id='text-input-default-2'
                    />
                  </div>
                </div>
              </form>
              <div className='w-form-done'></div>
              <div className='w-form-fail'></div>
            </div>
          </div>

          <div className={styles.modal_footer}>
            <button
              onClick={(e) => handleOnSubmit(e)}
              className='button-2 add w-button'
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
};

export default InputModal;
