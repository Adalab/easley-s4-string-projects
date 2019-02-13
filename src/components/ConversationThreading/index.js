import React, { Component } from 'react';
import './ConversationThreading.scss';
import Header from '../Header';
import IndividualMessage from '../IndividualMessage/index'
import SendMessage from '../SendMessage';
import MessageThreading from '../MessageThreading';
import Modal from "../Modal";
import GoBack from "../GoBack";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { tokenThreadFetch } from '../services/TokenThread';
import Loading from '../Loading';

class ConversationThreading extends Component {
  constructor(props){
    super(props);
    this.state= {
      infoThread: null
    }
  }

  componentDidMount(){
    const { token } = this.props;
    tokenThreadFetch(token)
      .then(data =>{
        return(
          this.setState({
            infoThread: data
          })
        )
      })
  }

  render() {
    const { addModalClick, isHidden, cancelClickModal, handleLogOut, isLoading } = this.props;
    const { infoThread } = this.state;
    if(!infoThread){
      return (<Loading />)
    }else{
      return (
        <React.Fragment>
          <Header addModalClick={addModalClick}>
            <div className="header__group__container">
              <span className="header__container__thread">
                <h2 className="header__group__title-thread">Hilo</h2>
                <h3 className="header__group__persons-thread">Recetas y menús</h3>
              </span>
            </div>
          </Header>
          <main className="main__conversationThreading">
            <Link className="style_link" to="/conversation-page">
              <GoBack />
            </Link>
            <IndividualMessage
            isLoading={isLoading}
            messageInfo={infoThread[0]}
            />
            <div className="answers">Respuestas</div>
            <ul>
              {infoThread
              .filter(message=> message.post_id !== null)
              .map(message =>{
                return(
                  <li>
                    <MessageThreading
                    messageInfo = {message}
                    />
                  </li>
                )
              })}
            </ul>
            <section className="container__message">
              <SendMessage />
            </section>
            <Modal
            isHidden={isHidden}
            cancelClickModal={cancelClickModal} handleLogOut={handleLogOut} />
          </main>
        </React.Fragment>
      )
    }


  }
}

ConversationThreading.propTypes = {
  addModalClick: PropTypes.func.isRequired,
  isHidden: PropTypes.bool.isRequired,
  cancelClickModal: PropTypes.func.isRequired,
  handleLogOut: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  dataUser: PropTypes.object.isRequired
}

export default ConversationThreading;
