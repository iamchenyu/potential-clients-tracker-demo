import * as React from "react";
import "./progress.css";
import PotentialClientTrackerApi from "../../../helper/api";
import ClientDetailTabBarProgressDates from "./ClientDetailTabBarProgressDates";
import ClientDetailTabBarProgressJourney from "./ClientDetailTabBarProgressJourney";

const ClientDetailTabBarProgress = ({ client }) => {
  const [clientDetails, setClientDetails] = React.useState(null);

  const statusMapping = {
    1: "Initial Contact",
    2: "Information Session",
    3: "Onsite Visit",
    4: "Applying for Green Card",
    5: "Applying for Citizenship",
    6: "Applying for SSI",
    7: "Applying for Medicaid",
    8: "Daycare Application Submission",
    9: "Government Phone Screening",
    10: "Government Interview",
    11: "Daycare Application Approved",
    12: "Daycare Application Denied",
    13: "Daycare Application Appealing",
    14: "Enrolled",
    15: "Not To Proceed",
  };

  React.useEffect(() => {
    const fetchClient = async (id) => {
      const { data } = await PotentialClientTrackerApi.getClient(id);
      setClientDetails(data.client);
    };
    fetchClient(client.id);
  }, []);

  const updateClient = (data) => {
    setClientDetails(data);
  };

  return (
    <>
      <ClientDetailTabBarProgressJourney
        clientDetails={clientDetails}
        statusMapping={statusMapping}
      />
      <ClientDetailTabBarProgressDates
        statusMapping={statusMapping}
        client={client}
        updateClient={updateClient}
      />
    </>
  );
};

export default ClientDetailTabBarProgress;
