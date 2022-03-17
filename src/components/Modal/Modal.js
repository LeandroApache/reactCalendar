import classes from "./Modal.module.css";
import ReactDOM from "react-dom";

function Backdrop(props) {
    return <div className={classes.backdrop} onClick={props.onHideModal}></div>
}
function ModalOverlay(props) {
    return <div className={classes.modal}>{props.children}</div>
}

const portalElement = document.getElementById("overlays");

function Modal(props) {
    return <>
        {ReactDOM.createPortal(<Backdrop onHideModal={props.onHideModal}/>, portalElement)}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </>
}
export default Modal;
