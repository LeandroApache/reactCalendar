import './App.css';
import dayjs from "dayjs";
import moment from "moment";
import updateLocale from "dayjs/plugin/updateLocale"
import Header from "./components/Header/Header";
import Monitor from "./components/Monitor/Monitor";
import Calendar from "./components/Calendar/Calendar";
import {useEffect, useState} from "react";
import Modal from "./components/Modal/Modal";
import NewEventForm from "./components/NewEventForm/NewEventForm";

// dayjs.extend(updateLocale);
// window.moment = moment;
// window.dayjs = dayjs;
//moment.updateLocale("en", {week : {dow: 1}}) the same as dayjs.updateLocale("en", {weekStart: 1})

const baseUrl = "http://localhost:4000";

//for update:
// add text scroll to event hover effect
//add additional features according to google calendar header
//use Formik instead of simple form and inputs
//use dayJs instead of moment js
// add delete events functional
//add cart of event ???
//add header for best navigation between months and years


function App() {
    moment.updateLocale("en", {week: {dow: 1}});
    const [isShowModal, setIsShowModal] = useState(false);
    const [today, setToday] = useState(moment());
    const [method, setMethod] = useState(null);
    //event for update or new created event
    const [event, setEvent] = useState(null);
    const [fetchedEvents, setFetchedEvents] = useState([]);

    //start day for UI rendering
    const startDay = today.clone().startOf("month").startOf("week");

    //handler for our monitor component
    const prevMonthClickHandler = () => {
        setToday(prevState => prevState.clone().subtract(1, 'month'));
    };
    const nextMonthClickHandler = () => {
        setToday(prevState => prevState.clone().add(1, 'month'));
    };
    const currentMonthClickHandler = () => {
        setToday(moment());
    };

    // we use next values for adding them to the fetch request.
    const startOfEventsRange = startDay.clone().format("X");
    const endOfEventsRange = startDay.clone().add(42, "day").format("X");

    useEffect(() => {
        fetch(`${baseUrl}/events?date_gte=${startOfEventsRange}&date_lte=${endOfEventsRange}`)
            .then(res => res.json())
            .then(data => {
                console.log(data, "Data from server");
                setFetchedEvents(data);
            })
    }, [today]);

    const showModalHandler = () => {
        setIsShowModal(true);
    }
    const hideModalHandler = () => {
        setIsShowModal(false);
        setEvent(null);
    }

    const addEventHandler = (method, date) => {
        //we defined our date to the value that equal the moment when we open our modal form
        setEvent({title: "", content: "", date});
        setMethod(method);
        showModalHandler();
    };
    const editEventHandler = (updatedEvent, method) => {
        setEvent(updatedEvent);
        setMethod(method);
        showModalHandler();
    };

    const changeEventHandler = (text, fieldType) => {
        setEvent((prevState) => {
            return {
                ...prevState,
                [fieldType]: text,
            }
        })
    };

    const fetchEventHandler = (method) => {
        const url = method === 'Update' ? `${baseUrl}/events/${event.id}` : `${baseUrl}/events`;
        const httpMethod = method === "Update" ? "PATCH" : "POST";
        fetch(url, {
            method: httpMethod,
            body: JSON.stringify(event),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (method === "Update") {
                    setFetchedEvents(prevState => {
                        return prevState.map(eventEl => eventEl.id === data.id ? data : eventEl)
                    })
                } else {
                    setFetchedEvents(prevState => {
                        return [...prevState, data]

                    })
                }
            })
        hideModalHandler();
    };


    return (
        <div className="App">
            {/*<Header/>*/}
            {isShowModal ? <Modal onHideModal={hideModalHandler}>
                <NewEventForm event={event} method={method} onFetch={fetchEventHandler}
                              onChangeField={changeEventHandler} onHideModal={hideModalHandler}/>
            </Modal> : null}
            <Monitor today={today}
                     onPrevMontClick={prevMonthClickHandler}
                     onNextMonthClick={nextMonthClickHandler}
                     onCurrentMontClick={currentMonthClickHandler}/>
            <Calendar startDay={startDay}
                      today={today}
                      events={fetchedEvents}
                      onAddEvent={addEventHandler}
                      onEditEvent={editEventHandler}
            />
        </div>
    );
}

export default App;
