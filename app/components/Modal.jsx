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

    let element;
    switch (buttonElement.type) {
        case 'img':
            element = React.createElement('img', {
                src: buttonElement.props.src.default,
                alt: buttonElement.props.alt,
                style: buttonElement.props.style,
                className: "interactive-element"
            });
            break;
    }

    return (
        <div className={"modal-button"}>
            <div onClick={toggle}>{element}</div>
            <Modal isOpen={modal} toggle={toggle} className={className} style={style}>
                {title !== "" &&
                    <ModalHeader toggle={toggle}>{title}</ModalHeader>
                }
                <ModalBody>
                    {props.children}
                </ModalBody>
            </Modal>
        </div>
    );
}

export default ModalElement;
