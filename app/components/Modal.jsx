import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalElement = (props) => {
    const {
        className,
        title,
        buttonElement,
        size,
        pos
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const style = {
        width: size.width,
        height: size.height,
        top: pos.top,
        left: pos.left
    };

    return (
        <div className={"modal-button"}>
            <div onClick={toggle}>{buttonElement}</div>
            <Modal isOpen={modal} toggle={toggle} className={className} style={style}>
                <ModalHeader toggle={toggle}>{title}</ModalHeader>
                <ModalBody>
                    {props.children}
                </ModalBody>
            </Modal>
        </div>
    );
}

export default ModalElement;
