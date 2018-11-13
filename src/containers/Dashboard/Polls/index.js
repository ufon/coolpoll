import React from "react";
import { Route, Switch } from "react-router-dom";

import NewPoll from "./NewPoll";
import EditPoll from "./EditPoll";
import Polls from "./AllPolls";

const PollsPage = ({ match }) => (
  <div>
    <Switch>
      <Route exact path={`${match.path}/all`} component={Polls} />
      <Route exact path={`${match.path}/new`} component={NewPoll} />
      <Route path={`${match.path}/:id`} component={EditPoll} />
    </Switch>
  </div>
);

export default PollsPage;
