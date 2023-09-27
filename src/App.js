import QuestionContainer from './QuestionContainer';
import {useState} from 'react';
import generateCardArr from './cardService';
import {BrowserRouter as Router, Route, Link, Routes} from "react-router-dom"
import EditQuestion from './EditQuestion';
function App() {

  const [questionList, setQuestionList] = useState(generateCardArr);

  const handleEditQuestion = (itemToEdit) =>{
      const updatedList = questionList.map(item => 
        item.id === itemToEdit.id? itemToEdit : item);
      setQuestionList(updatedList);
  }
  const handleAddQuestion = (itemToAdd) =>{
    const updatedList = [...questionList, itemToAdd];
    setQuestionList(updatedList);
  }

  const toggleActiveStatus = (itemId) => {
    const updatedList = questionList.map(item=>
        item.id === itemId ? {...item,active: !item.active} : item
      )
    
    setQuestionList(updatedList);
  }
  
  const getNextAvailableId =()=>{
    return questionList.length-1;
  }
  const getItemById = (id) => {
    const requestedItem = questionList.find((item)=>id == item.id);
    return requestedItem;
  }
  return (
    <Router>
      <div  className="d-flex justify-content-center align-items-center" >
        <Routes>
          <Route path ="/" element={
            <div className="card" >
              <div className="card-header">
                <h2>Question List</h2>
                <Link to="/add" className="btn btn-primary">
                    Add Question
                  </Link>
                
                
              </div>  
              <div className="card-body"  style={{overflow:"scroll",height:75+"vh",width:75+"vw"}}>
                <QuestionContainer toggleActive={toggleActiveStatus} questionList={questionList} />
              </div>
            </div>  
          } />
          <Route path="/add" element={<EditQuestion getNextId={getNextAvailableId} addQuestion={handleAddQuestion}/>} />
          <Route path="/edit/:id" element={<EditQuestion getItem={getItemById} editQuestion={handleEditQuestion} />} />
            
  
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
