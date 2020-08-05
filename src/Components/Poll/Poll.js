import React from "react";
import Poll from "react-polls";
import Paper from "@material-ui/core/Paper";
import "./Poll.css";

import { firebaseApp } from "./../../Config/firebase";

const pollStyles1 = {
  questionSeparator: true,
  questionSeparatorWidth: "poll",
  questionBold: true,
  questionColor: "#3F51B5",
  align: "left",
  theme: "blue",
};

class PollComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      pollAnswers: [],
    };
  }

  async componentDidMount() {
    let pollAnswers = this.props.data.pollAnswers;
    this.setState({
      pollAnswers: [...pollAnswers],
    });
  }
  handleVote = (voteAnswer, data, i) => {
    console.log(voteAnswer, data, i);
    const { pollAnswers } = this.state;
    const newPollAnswers = pollAnswers.map((answer) => {
      if (answer.option === voteAnswer) {
        answer.votes++;
        firebaseApp
          .database()
          .ref(`poll/${i}`)
          .update({ pollAnswers })
          .then(() => {
           // alert("data updated");
          });
        return answer;
      }
    });
    this.setState({
      pollAnswers: newPollAnswers,
    });
  };

  render() {
    return (
      <div>
        <Paper className="poll-card">
          <Poll
            customStyles={pollStyles1}
            question={this.props.data.pollQuestion}
            answers={this.props.data.pollAnswers}
            onVote={(e) =>
              this.handleVote(e, this.props.data, this.props.index)
            }
          />
        </Paper>
      </div>
    );
  }
}

export default PollComponent;
