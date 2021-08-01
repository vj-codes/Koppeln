import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import userLogo from "../../assets/user.png";
import { db, auth } from "../../firebase";
import "./contactStyles.css";
import { useAuth } from "../../contexts/AuthContext";

import { useCollectionData } from "react-firebase-hooks/firestore";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: "100%",
    height: "80vh",
  },
  headBG: {
    backgroundColor: "#e0e0e0",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
  messageArea: {
    height: "70vh",
    overflowY: "auto",
  },
});

const Chat = (props) => {
  const classes = useStyles();

  const { currentUser } = useAuth();

  // const [datas, setDatas] = useState({
  //   selectTitle: '',
  //   sendTo: "",
  // });

  // useEffect(() => {
  //   if(props.match?.params){
  //   setDatas({
  //     selectTitle: props.match.params.title,
  //     sendTo: props.match.params.id,
  //   })}
  // },[props])

  return (
    <div className='contact-app' style={{ marginTop: "70px"}}>
      <header>
        <h1>Messages</h1>
      </header>

      <section>
        {currentUser ? <ChatRoom {...props} props={props} /> : console.log("no chat room")}
      </section>
    </div>
  );
};

function ChatRoom(props) {
  const dummy = useRef();
  const messagesRef = db.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");



// for (var i = 0; i < messages?.length; i++) {
//   if(messages[i].sendTo == uid){
//     console.log("chatrome",messages[i].sendTo)
//     setSaveSendTo(messages[i].uid)
//   }
//   else{
//     console.log("not match")
//   }
// }
  

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    const sendData = {
      
        text: formValue,
        //   createdAt: firebase.db.Timestamp.serverTimestamp(),
        createdAt: new Date(),
 
        uid,
        photoURL,
      
    }

    await messagesRef.add(sendData);

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main style={{ marginTop: "70px" }} className='contact-main'>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} {...props} props={props}/>)}

        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage} className='contact-form'>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder='say something nice'
        />

        <button type='submit' disabled={!formValue}>
          🕊️
        </button>
      </form>
    </>
  );
}

function ChatMessage(props) {

  const { text, uid, photoURL,  } = props.message;
  
  // const {id, title} = props.props.match.params;
// {console.log(props)}
// {console.log(currentUser.uid)}
  // {console.log(selectTitle, title)}
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (

    <>
    {  
    // title == selectTitle
    // sendTo == (currentUser.uid) || uid == currentUser.uid
    //  ?
      (<div className={`message ${messageClass}`}>
        <img src={photoURL || userLogo} />
        <p>{text}</p>
      </div>)
      // :(<div></div>)
}
    </>
  );
}

export default Chat;
