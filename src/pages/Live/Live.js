import { useState } from "react";
import classes from "../Upcomming/Upcomming.module.css";
import Modal from "../../components/Modal";
import Backdrop from "../../components/Backdrop";
import TableContent from "../TableContent/TableContent";
import Auxillary from "../../hoc/Auxillary/Auxillary";

function Live(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState({})

  /* handle the popup on click of view pricing */
  function priceHandler(data) {
    setModalData(data);
    setModalIsOpen(true);
  }

  /* close the view pricing popup */
  function closeModalHandler() {
    setModalIsOpen(false);
  }
  /* Render the table data */
  function renderTableData() {
    return props.liveData.map((CampaignData, index) => {
      return (
        <tr key={index}>
          <TableContent displayData={CampaignData} index={index} dateChangeHandler={props.dateChangeHandler} priceHandler={priceHandler} languageData={props.languageData} type='liveCampaign'></TableContent>
        </tr>
      );
    });
  }
  function renderTableHeader() {
    return (
      <Auxillary>
        <th className="pl-2">
          <div >{props.languageData.date.value}</div>
        </th>
        <th className="pl-2">
          <div>{props.languageData.campaign.value}</div>
        </th>
        <th className="pl-2">
          <div>{props.languageData.view.value}</div>
        </th>
        <th className="pl-2">
          <div>{props.languageData.actions.value}</div>
        </th>
      </Auxillary>
      
    );
}

return (
  <div>
    {props.liveData.length ? (
      <div className="table-responsive text-nowrap">
      <table id="CampaignData" className={classes.CampaignData}>
        <thead>
        <tr>{renderTableHeader()}</tr>
        </thead>
        <tbody>
          
          {renderTableData()}
        </tbody>
      </table>
      </div>
    ) : null}
    {!props.liveData.length ? <h2>No campaign is scheduled</h2> : null}
    {modalIsOpen && (
      <Modal
        onCancel={closeModalHandler}
        onConfirm={closeModalHandler} data={modalData} languageData={props.languageData} 
      ></Modal>
    )}
    {modalIsOpen && <Backdrop onCancel={closeModalHandler}></Backdrop>}
  </div>
);
}
export default Live;
