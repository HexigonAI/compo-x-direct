import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import styles from '../../styles/InputModal.module.css';

//NOTE: whatever function that is being passed to this modal needs to receive the event object as the first argument

const InputModal = ({
  isOpen,
  header,
  description,
  labelOne,
  labelTwo,
  buttonText,
  closeModal,
  handleSubmit,
}) => {
  if (!isOpen) return null;

  const [inputOne, setInputOne] = useState('');
  const [inputTwo, setInputTwo] = useState('');

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal_overlay} onClick={(e) => closeModal()}></div>

      <div className={styles.modal_wrapper}>
        <div className={styles.modal_container}>
          <div className={styles.modal_header}>
            <div className={styles.modal_header__label}></div>
            <div className={styles.modal_header__heading}>{header}</div>
            <div className={styles.modal_header__subheading}>{description}</div>
            <a
              style={{ cursor: 'pointer' }}
              onClick={(e) => closeModal()}
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
                onSubmit={(e) => handleSubmit(e, inputOne, inputTwo)}
              >
                <div className={styles.form_item}>
                  <label htmlFor='email' className={styles.modal_header_label}>
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

                {labelTwo && (
                  <div className={styles.form_item}>
                    <label
                      htmlFor='email'
                      className={styles.modal_header_label}
                    >
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
                )}
                : {null}
              </form>

            </div>
          </div>

          <div className={styles.modal_footer}>
            <button
              className={styles.create_button}
              onClick={(e) => handleSubmit(e, inputOne, inputTwo)}
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
