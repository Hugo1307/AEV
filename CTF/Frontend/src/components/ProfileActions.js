import {Container, Row} from "react-bootstrap";
import LogViewComponent from "./LogView/LogViewComponent";
import {getCronLogs, setCronSchedule} from "../api/apiHandler";
import {toast} from "react-toastify";
import axios from "axios";
import {getAuthorizationHeader} from "../api/authHandler";
import {useEffect, useState} from "react";

const ProfileActions = (props) => {

    const [cronLogs, setCronLogs] = useState("");

    const getCronLogsValues = (notify) => {

        axios.get(getCronLogs().uri, {
            headers: {Authorization: getAuthorizationHeader()}
        }).then(r => {

            const cronLogsData = r.data;
            setCronLogs(cronLogsData.logs);

            if (notify) {
                toast("Logs Refreshed!")
            }

        }).catch(e => {
            if (notify) {
                toast("Logs Refreshed!")
            }
        });

    }

    const postSchedulerValue = () => {

        const cronValue = document.getElementById("cronArgumentInput").value;

        if (!cronValue) {
            toast("Please set a Cron Argument in the input.");
            return;
        }

        setCronSchedule(cronValue).then(response => {
            if (response.success === true) {
                toast("Scheduler value successfully set.")
            } else {
                toast("Error setting scheduler value.")
            }
        });

    }

    useEffect(() => {
        getCronLogsValues(false);
    }, [])

    if (!props.loading) {
        if (props.isAdmin) {
            return (
                <Container className="h-75">
                    <Row className="h-75">
                        <Row className="h-75">
                            <h3 className="m-0">System Logs</h3>
                            <small id="systemLogsHelp" className="form-text text-muted">
                                Logs provided by the system scheduled tasks stored in '/var/log/cron.log'.
                            </small>
                            <LogViewComponent text={cronLogs}/>
                        </Row>
                        <Row className="h-25">
                            <div className="form-group mt-3">
                                <button type="submit" className="btn btn-dark w-25" onClick={() => getCronLogsValues(true)}>Refresh Logs</button>
                            </div>
                        </Row>
                    </Row>
                    <Row className="h-25 mt-4">
                        <h3 className="m-0">System Cleanup Interval</h3>
                        <small id="systemCleanupHelp" className="form-text text-muted">
                            A system cleanup will be performed periodically.
                        </small>
                        <small id="systemCleanupHelp" className="form-text text-muted m-0">
                            Use the input below to schedule the system cleanup using Crontab.
                        </small>
                        <div className="form-group mt-3">
                            <label htmlFor="cronArgumentInput">Clean-Up Interval</label>
                            <input type="text" className="form-control mt-2" id="cronArgumentInput"
                                   aria-describedby="systemCleanupArgumentHelp" placeholder="Enter Crontab Argument"/>
                            <button type="submit" className="btn btn-dark my-3 w-25" onClick={() => postSchedulerValue()}>Set Scheduler</button>
                        </div>
                    </Row>
                </Container>
            );
        } else {
            return (
                <Container>
                    <Row>
                        <h5>Only Available for System Administrators</h5>
                    </Row>
                </Container>
            );
        }
    } else {
        return (
            <Container className="text-center mt-5">
                <div className="spinner-border" role="status" />
            </Container>
        );
    }

}

export default ProfileActions;
