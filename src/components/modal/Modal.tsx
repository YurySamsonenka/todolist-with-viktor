import React, {ReactNode} from 'react';
import styles from './Modal.module.css';


interface ModalProps {
    children: ReactNode;
}
export const Modal = ({ children }:ModalProps) => {
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                {children}
            </div>
        </div>
    );
};

