
import React from "react";
import classes from "./TableContent.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileCsv,
  faChartLine
} from "@fortawesome/free-solid-svg-icons";
import Auxillary from "../../hoc/Auxillary/Auxillary";
function TableContent(props){
  /* display the formatted date */
  function formatDate(data) {
    let d = new Date(data);
    let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
    let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
    let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
    return `${mo} ${ye}, ${da}`;
  }
  /* calculate the number of days from the todays date */
  function calculateDays(data) {
    let oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    let firstDate = new Date(data).setHours(0,0,0,0);
    let secondDate = new Date().setHours(0,0,0,0);
   
    let diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    return diffDays;
  }
    return(
        <Auxillary>
            <td>
            {/* <div> */}
              <div >{formatDate(props.displayData.createdOn)}</div>
              <div className=" text-muted">
                 {props.type === 'pastCampaign'?calculateDays(props.displayData.createdOn) + ' ' + props.languageData.daysAgo.value : null} {props.type === 'upcommingCampaign'? calculateDays(props.displayData.createdOn)  + ' ' +  props.languageData.daysAhead.value : null} {props.type === 'liveCampaign'? props.languageData.today.value : null}
              </div>
            {/* </div> */}
          </td>
          <td>
            <div className="d-inline-flex">
              <img
                src={`${process.env.PUBLIC_URL}/${props.displayData.image_url}`}
                alt={props.displayData.name}
                width="40"
                height="40"
              ></img>
              <div className="pl-3">
                <div>{props.displayData.name}</div>
                <div className="text-muted">{props.displayData.region}</div>
              </div>
            </div>
          </td>
          <td>
            <div className={[classes.custom_pointer,"d-flex"].join(' ')} onClick={()=>props.priceHandler(props.displayData)}>
              <div className={classes.cssCircle}>&#36;</div>
              <div className="pl-2">{props.languageData.viewPricing.value}</div>
            </div>
          </td>
          <td>
            <div className="d-inline-flex">
              <div >
                {/* <div> */}
                  <FontAwesomeIcon
                    icon={faFileCsv}
                    className="fa-2x"
                    color="#21a008"
                  />
                {/* </div> */}

                <span className="pl-2 ">{props.languageData.csv.value}</span>
              </div>
              <div className="pl-5">
                {/* <div> */}
                  <FontAwesomeIcon
                    icon={faChartLine}
                    className="fa-2x "
                    color="#f3680b"
                  />
                {/* </div> */}
                <span className="pl-2 ">{props.languageData.report.value}</span>
              </div>
              <div className="pl-3 mt-2">
                {/* <div className="pl-4"> */}
                  <input className={classes.date}
                    type="date"
                    onChange={(event) =>
                      props.dateChangeHandler(event, props.index, props.type)
                    }
                  ></input>
                {/* </div> */}
                <span className="pl-2">{props.languageData.scheduleAgain.value}</span>
              </div>
            </div>
          </td>
        </Auxillary>
    )

}
export default TableContent;