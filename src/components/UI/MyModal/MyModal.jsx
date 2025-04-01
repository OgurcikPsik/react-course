import React from 'react';
import classes from "./MyModal.module.css";
const MyModal = ({visible, setVisible, children}) => {
    const rootModal = [classes.myModal];
    if (visible) {
        rootModal.push(classes.active);
    };
    return (
        <div onClick={() => setVisible(false)} className={rootModal.join(" ")}>
            <div onClick={event => event.stopPropagation()} className={classes.myModalContent}>{children}</div>
        </div>
    );
};

export default MyModal;