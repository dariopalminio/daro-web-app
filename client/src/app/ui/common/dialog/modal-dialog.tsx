import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import "./modal-dialog.css";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    style?: any;
}

/**
    Modal Dialog

    Stateless components and controlled component
    
const {isOpen, toggle} = useModalDialog();

<button onClick={toggle}>Show Modal</button>
<ModalDialog
        isOpen={isOpen}
        onClose={toggle}
      >
      <p>Contenido 1</p>
</ModalDialog>

 */
const ModalDialog: React.FC<Props> = ({ isOpen, onClose, children, style }) => {

    const ModalHeader = styled.div`
    display: flex;
    justify-content: flex-end;
    `;

    const ModalCloseButton = styled.button`
    cursor: pointer;
    position: absolute;
    right: 15px;
    top: 15px;
    width: 30px;
    height: 30px;
    background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);
    border: 0px;
    color: #fff;
    font-size: 25px;
    font-weight: 600;
    line-height: 30px;
    text-align: center;
    border-radius: 50%;
    `;

const ModalCross = styled.span`
    position: absolute;
    left: 0px;
    top: 0px;
    margin-top: 0;
    margin-left: 0;
    width: 30px;
    height: 30px;
    `;

    return isOpen ? ReactDOM.createPortal(
        <React.Fragment>
            <div className="modal-overlay" />
            <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
                <div className="modal-paper">
                    <ModalHeader>
                        <ModalCloseButton type="button"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={onClose}>
                            <ModalCross className="modal-crux" aria-hidden="true">&times;</ModalCross>
                        </ModalCloseButton>
                    </ModalHeader>
                    {children}
                </div>
            </div>
        </React.Fragment>, document.body
    ) : null
};

export default ModalDialog;
