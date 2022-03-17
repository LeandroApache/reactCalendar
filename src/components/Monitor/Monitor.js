import React from "react";
import {IoCaretForward} from "react-icons/io5"
import {IoCaretBack} from "react-icons/io5"
import classes from "./Monitor.module.css"

const Monitor = ({today, onPrevMontClick, onNextMonthClick, onCurrentMontClick}) => {
    return <div className={classes.monitor}>
        <div className={classes.date}>
            <span className={classes.month}>{today.format("MMMM")}</span>
            <span className={classes.year}>{today.format("YYYY")}</span>
        </div>
        <div className={classes.controls}>
            <button onClick={onPrevMontClick}>
                <IoCaretBack size={12} color={"#B38867"}/>
            </button>
            <button onClick={onCurrentMontClick}>Today</button>
            <button onClick={onNextMonthClick}><IoCaretForward size={12} color={"#B38867"}/></button>
        </div>
    </div>
};

export default Monitor;
