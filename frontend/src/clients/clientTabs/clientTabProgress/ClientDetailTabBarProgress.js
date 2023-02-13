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
    4: "Application Submission",
    5: "Phone Screening",
    6: "Interview",
    7: "Application Approved",
    8: "Application Denied",
    9: "Appealing",
    10: "Enrolled",
    11: "Not To Proceed",
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
