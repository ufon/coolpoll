import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import NewPoll from "./NewPoll";
import EditPoll from "./EditPoll";
import Polls from "./AllPolls";

const PollsPage = ({ match }) => (
  <Fragment>
    <Switch>
      <Route exact path={`${match.path}/all`} component={Polls} />
      <Route exact path={`${match.path}/new`} component={NewPoll} />
      <Route path={`${match.path}/:id`} component={EditPoll} />
    </Switch>
  </Fragment>
);

export default PollsPage;
