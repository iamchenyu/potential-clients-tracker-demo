import * as React from "react";
import "./progress.css";
import PotentialClientTrackerApi from "../../../api";
import ClientDetailTabBarProgressDates from "./ClientDetailTabBarProgressDates";
import ClientDetailTabBarProgressJourney from "./ClientDetailTabBarProgressJourney";

const ClientDetailTabBarProgress = ({ client }) => {
  const [clientDetails, setClientDetails] = React.useState(null);

  const statusMapping = {
    1: "Initial Contact",
    2: "Information Session",
    3: "Onsite Visit",
    4: "Applying for Green Card",
    5: "Applying for Medicaid",
    6: "Daycare Application Submission",
    7: "Phone Screening",
    8: "Interview",
    9: "Daycare Application Approved",
    10: "Daycare Application Denied",
    11: "Daycare Application Appealing",
    12: "Enrolled",
    13: "Not To Proceed",
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
