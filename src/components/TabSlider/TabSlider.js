import { useState, React, useEffect } from "react";
import Tabs, { TabPane } from "rc-tabs";
import "../../../node_modules/rc-tabs/assets/index.css";
import "./TabSlider.css";
import Upcomming from "../../pages/Upcomming/Upcomming";
import Live from "../../pages/Live/Live";
import Past from "../../pages/Past/Past";

function TabSlider(props) {
  function callback(e) {
    console.log(e);
  }
  let [upcommingData, setupcommingData] = useState([]);
  let [liveData, setliveData] = useState([]);
  let [pastData, setpastData] = useState([]);
  let [campaignData, setCampaignData] = useState([]);

  /* Fetch the data from data.json to display upcomming, live, past list */
  const getData = () => {
    fetch("data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        setCampaignData(res["data"])
      });
  };

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    /* Filter the data based on the future date */
    setupcommingData(
      campaignData.filter(
        (ele) =>
          new Date().setHours(0, 0, 0, 0) <
          new Date(ele.createdOn).setHours(0, 0, 0, 0)
      )
    );
    /* Filter the todays date data */

    setliveData(
      campaignData.filter(
        (ele) =>
          new Date().setHours(0, 0, 0, 0) ===
          new Date(ele.createdOn).setHours(0, 0, 0, 0)
      )
    );

    /* Filter the data based on the past date */

    setpastData(
      campaignData.filter(
        (ele) =>
          new Date().setHours(0, 0, 0, 0) >
          new Date(ele.createdOn).setHours(0, 0, 0, 0)
      )
    );
  }, [campaignData]);

  /* handle the functionality when user change the scheduled date */
  function dateChange(event, index, type) {
    if (type === "pastCampaign") {
      if (new Date(event.target.value).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0)) {
        pastData[index].createdOn = event.target.value;
        upcommingData.push(pastData[index]);
      }
      if (
        new Date(event.target.value).setHours(0, 0, 0, 0) <
        new Date().setHours(0, 0, 0, 0)
      ) {
        pastData[index].createdOn = event.target.value;
        pastData.push(pastData[index]);
      }

      if (
        new Date(event.target.value).setHours(0, 0, 0, 0) ===
        new Date().setHours(0, 0, 0, 0)
      ) {
        pastData[index].createdOn = event.target.value;
        liveData.push(pastData[index]);
      }
      pastData.splice(index, 1);
    }
    else if (type === "liveCampaign"){
      if (new Date(event.target.value).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0)) {
        liveData[index].createdOn = event.target.value;
        upcommingData.push(liveData[index]);
      }
      if (
        new Date(event.target.value).setHours(0, 0, 0, 0) <
        new Date().setHours(0, 0, 0, 0)
      ) {
        liveData[index].createdOn = event.target.value;
        pastData.push(liveData[index]);
      }

      if (
        new Date(event.target.value).setHours(0, 0, 0, 0) ===
        new Date().setHours(0, 0, 0, 0)
      ) {
        liveData[index].createdOn = event.target.value;
        liveData.push(liveData[index]);
      }
      liveData.splice(index, 1);
    }
    else if (type === "upcommingCampaign"){
      if (new Date(event.target.value).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0)) {
        upcommingData[index].createdOn = event.target.value;
        upcommingData.push(upcommingData[index]);
      }
      if (
        new Date(event.target.value).setHours(0, 0, 0, 0) <
        new Date().setHours(0, 0, 0, 0)
      ) {
        upcommingData[index].createdOn = event.target.value;
        pastData.push(upcommingData[index]);
      }

      if (
        new Date(event.target.value).setHours(0, 0, 0, 0) ===
        new Date().setHours(0, 0, 0, 0)
      ) {
        upcommingData[index].createdOn = event.target.value;
        liveData.push(upcommingData[index]);
      }
       upcommingData.splice(index, 1);
    }

    setpastData([...pastData]);
    setupcommingData([...upcommingData]);
    setliveData([...liveData]);

  }
  return (
    <div className="offset-1 col-10 pt-4">
      <Tabs onChange={callback} tabBarGutter={20} >
        <TabPane tab={props.languageData.upcommingCampaigns.value} key="1">
          <Upcomming
            upcommingData={upcommingData}
            dateChangeHandler={dateChange} languageData={props.languageData}
          ></Upcomming>
        </TabPane>
        <TabPane tab={props.languageData.liveCampaigns.value} key="2">
          <Live liveData={liveData} dateChangeHandler={dateChange} languageData={props.languageData}></Live>
        </TabPane>
        <TabPane tab={props.languageData.pastCampaigns.value} key="3">
          <Past pastData={pastData} dateChangeHandler={dateChange} languageData={props.languageData}></Past>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default TabSlider;
