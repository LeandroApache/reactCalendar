import React from "react";
import classes from "./Calendar.module.css";
import moment from "moment";

const Calendar = ({startDay, today, events, onAddEvent, onEditEvent}) => {
    let day = startDay.clone().subtract(1, "day");
    const days = [...Array(42)].map(() => day.add(1, "day").clone());

    return <>
        <div className={classes.calendarWrapper}>
            {[...Array(7)].map((_, i) => <div
                className={`${classes.calendarCell} ${classes.headerCell}`}>{moment().day(i + 1).format("ddd")}</div>)}
            {days.map((dayItem) => {

                const isWeekend = dayItem.day() === 6 || dayItem.day() === 0;
                //dayItem.day() returned number of a day in a week
                const isOtherMonthDay = moment(today).isSame(dayItem, "month");
                //we cant use today prop because our today state will be changed after button will be clicked
                const isCurrentDay = moment(moment()).isSame(dayItem, "day");
                const startOfDay = dayItem.format("X");
                const endOfDay = dayItem.endOf("day").format("X");
                return <div
                    className={`${classes.calendarCell} ${!isOtherMonthDay && classes.calendarCellOtherMonth} ${isWeekend && classes.calendarCellWeekend} ${isCurrentDay && classes.calendarCellCurrent}`}
                    key={dayItem.unix()}>
                    <div className={[classes.cellHeader]}>
                        <span onDoubleClick={()=>onAddEvent("Create", startOfDay)}>{dayItem.format("D")}</span>
                    </div>
                    <div className={classes.cellBody}>
                        <ul>
                            {
                                events
                                    .filter(event => event.date >= startOfDay && event.date <= endOfDay)
                                    .map(filteredEvent => {
                                        return <li key={filteredEvent.id}
                                                   onDoubleClick={() => onEditEvent(filteredEvent, "Update")}
                                        >
                                            {filteredEvent.title}
                                        </li>
                                    })
                            }
                        </ul>
                    </div>
                </div>
            })
            }
        </div>
    </>
};

export default Calendar;
