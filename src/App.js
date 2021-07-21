import Layout from "./hoc/Layout/Layout.js";
import { useState, React, useEffect } from "react";

import TabSlider from "./components/TabSlider/TabSlider.js";
import Spinner from "./components/Spinner/Spinner.js";
function App() {
  let [selectValue, setSelectValue] = useState('en')
  let [languageData, setLanguageData] = useState([]);
  let [apiError, setApiError] = useState(false);
  let [getResponse, setResponse] = useState(false);


  /* get called on the chnage of language */
  function handleChange(e) {
    setSelectValue(e.target.value)
    getData();
  }

  /* Fetch the literals based on the language selected */
  const getData = () => {
    fetch("Localization/locale-" + selectValue + ".json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        setResponse(true);
        setLanguageData(res);
      }).catch(error => {
        setResponse(false)
        setApiError(true);
    });
  };

  useEffect(() => {
    getData();
  });

  return (
    <div>

      <Layout>

        <div className="offset-1 col-10 pt-3">
          <label htmlFor="language">Choose a language:</label>
          <select id="language" name="language" onChange={handleChange} value={selectValue}>
            <option value="en" >English</option>
            <option value="gn">German</option>
          </select>
        </div>
        
        {Object.keys(languageData).length > 0 && (
          <h1 className="offset-1 col-10 pt-3">
            {languageData.manageCampaigns.value}
          </h1>
        )}
        <div className="col-10 offset-1">
        {!getResponse && !apiError && <Spinner> </Spinner>}
        </div>
        {getResponse && Object.keys(languageData).length > 0 && <TabSlider languageData={languageData}></TabSlider>}
          {apiError && <h1 className="offset-1 col-10">Failed to load literals</h1>}
      </Layout>
    </div>
  );
}

export default App;
