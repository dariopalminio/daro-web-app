import React from 'react';
import ReactDOM from 'react-dom';
import "./modal-dialog.css";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    style?: any;
}

/**
    Modal Dialog

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

    return isOpen ? ReactDOM.createPortal(
        <React.Fragment>
            <div className="modal-overlay" />
            <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
                <div className="modal">
                    <div className="modal-header">
                        <button type="button"
                            className="modal-close-button"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={onClose}>
                            <span className="modal-crux" aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </React.Fragment>, document.body
    ) : null
};

export default ModalDialog;
