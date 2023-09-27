import QuestionContainer from './QuestionContainer';
import {useState} from 'react';
import generateCardArr from './cardService';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom"
function App() {

  const [questionList, setQuestionList] = useState(generateCardArr);

  const handleEditQuesiton = (itemToEdit) =>{
      const updatedList = questionList.map(item => 
        item.id === itemToEdit.id? itemToEdit : item);
      setQuestionList(updatedList);
  }
  const handleAddQuestion = (itemToAdd) =>{

  }

  const toggleActiveStatus = (itemId) => {
    const updatedList = questionList.map(item=>
        item.id === itemId ? {...item,active: !item.active} : item
      )
    
    setQuestionList(updatedList);
  }

  return (
    <div  className="d-flex justify-content-center align-items-center" style={{height:500 + 'px',marginTop:50+'px'}}>
      <div className="card w-50" id="cardSizer">
        <div className="card-header">
          <div>Question List</div>
          <button type="button" className="btn btn-primary" onClick={handleAddQuestion}>Add</button> 
        </div>  
        <div className="card-body"  style={{height:500+"px", overflow:"scroll"}}>
          <QuestionContainer toggleActive={toggleActiveStatus} editQuestion ={handleEditQuesiton} questionList={questionList} />
        </div>
      </div>  
    </div>
  );
}

export default App;
