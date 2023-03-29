import React from 'react';

import styles from '../styles/modal.module.css';

const InputModal = () => {
  return (
    <div class={styles.modal_container}>
      <div class={styles.modal_header}>
        <div class={styles.modal_header__label}></div>
        <div class={styles.modal_header__heading}>Enter Server Information</div>
        <a href='#' class={styles.modal_close}></a>
      </div>
      <div class={styles.modal_content}>
        <div class='w-form'>
          <form
            id='email-form'
            name='email-form'
            data-name='Email Form'
            method='get'
          >
            <div class={styles.form_item}>
              <label for='email' class='label'>
                Server Name
              </label>
              <div class={styles.text_input_field_wrapper}>
                <input
                  type='text'
                  class={styles.text_input}
                  maxlength='256'
                  name='text-input-default-2'
                  data-name='Text Input Default 2'
                  id='text-input-default-2'
                />
              </div>
            </div>
            <div class={styles.form_item}>
              <label for='email' class='label'>
                Server Details
              </label>
              <div class={styles.text_input_field_wrapper}>
                <input
                  type='text'
                  class={styles.text_input}
                  maxlength='256'
                  name='text-input-default-2'
                  data-name='Text Input Default 2'
                  id='text-input-default-2'
                />
              </div>
            </div>
 
          </form>
          <div class='w-form-done'></div>
          <div class='w-form-fail'></div>
        </div>
      </div>
      <div class={styles.modal_footer}>
        <a href='#' class={styles.btn_primary}>
            Create New Server
        </a>
      </div>
    </div>
  );
};

export default InputModal;
