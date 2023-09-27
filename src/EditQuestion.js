import {useState, useEffect} from 'react';
import './EditQuestion.css';
import {useParams, useLocation, Link, useNavigate} from 'react-router-dom';

const EditQuestion = ({getItem, editQuestion,getNextId,addQuestion}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const {id} = useParams();
    const [currentItem, setCurrentItem] = useState({});
    const [errors, setErrors] = useState({});
    useEffect(()=>{
        if(location.pathname === '/add')
        {
            setCurrentItem({
                id:getNextId(),
                question: "",
                questionImg: "",
                answer:"",
                answerImg:"",
                type:"normal",
                category: "B1",
                chapter:"",
                references: "",
                active: true
            });
            
        }
        else if (id) {
            setCurrentItem(getItem(id));
        }
    },[id, location.pathname,getNextId,getItem]);
    
    
    
    
    const parseQuestion = () =>{
        const re = /(\.\.\.)/gm;
        const answersNeeded = currentItem.question.match(re);
        let answers =[];
        
        if(answersNeeded != null)
        {
            for(let i = 0; i < answersNeeded.length; i++)
            {
                answers.push(
                <div key={i} className="list-group">
                    
                    <input className="list-group-item" value={currentItem.answer.split('|')[i]} onChange={(e)=>handleAnswerChange(e.target.value,i)} />
                    
                </div>)
            }
        }
        
        return answers;
    }

    const handleAnswerChange = (newValue, index) =>{
        const answersArray = currentItem.answer.split('|');
        answersArray[index] = newValue;
        const newAnswerString = answersArray.join('|');
        setCurrentItem(prevItem => ({...prevItem,answer:newAnswerString}));
    }
    const allAnswersFilled = () => {
        const answersArray = currentItem.answer.split('|');
        answersArray.map(item => !item.trim());
        if(answersArray.length === 0)
        {
            return false;
        }
        else{
            return true;
        }

    }
    const validate = () => {
        let formErrors = {};

        if(currentItem.type === 'normal')
        {
            if(!currentItem.question.trim() && !currentItem.questionImg.trim())
                formErrors.qaQuestion = "Question and Question Image cannot both be blank.";
            if(!currentItem.answer.trim() && !currentItem.answerImg.trim())
                formErrors.qaAnswer = "Answer and answer image cannot both be blank!";
        }   
        else if(currentItem.type ==='fill-in')
        {
            if(!currentItem.question.trim())
                formErrors.fiQuestion = "Question cannot be blank.";
            if(parseQuestion().length <= 0)
                formErrors.fiQuestionReq = "Question does not contain any [...]'s!";
            if(!allAnswersFilled())
                formErrors.fiAnswer = "All answers must be filled in.";

        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    }
    const onSubmit =(event)=>{

        event.preventDefault();
        if(validate()){
            if(editQuestion )
            {
                editQuestion(currentItem);
            } 
            else if (addQuestion)
            {
                addQuestion(currentItem);
            }
            
            navigate("/");
        }
        else{

        }
        
    }


    return (
        <div className="card">
        <div className="card-header">
            {editQuestion && "Edit Question"}
            {addQuestion && "Add Question"}
        </div>
        <div className="card-body">

        
        <form onSubmit={onSubmit} className="list-group">
            <label className="list-group-item">
                Id:
                <input value={currentItem.id} disabled/>
            </label> <br />
            <label className="list-group-item">
                Question Type:
                <select value={currentItem.type} onChange={(e)=>setCurrentItem(item => ({...item,type:e.target.value}))}>
                    <option value="normal">Q/A</option>
                    <option value="fill-in">Fill-in</option>
                </select>
                 
            </label> <br />
            <label className="list-group-item">
                Category Type:
                <select value={currentItem.category} onChange={(e) => setCurrentItem(item => ({...item,category:e.target.value}))}>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="B3">B3</option>
                    <option value="B4">B4</option>
                    <option value="S1">S1</option>
                    <option value="S2">S2</option>
                    <option value="S3">S3</option>
                    <option value="S4">S4</option>
                </select>
                 
            </label><br />
            {currentItem.type === 'normal' && 
                <div>           
                    {errors.qaQuestion && <span className="error">{errors.qaQuestion}</span>}
                    <label className="list-group-item">
                        Question: 
                        <input value={currentItem.question} onChange={(e)=>setCurrentItem(item=>({...item,question:e.target.value}))} />
                    </label>
                    <label className="list-group-item">
                        Question Img: 
                        <input value={currentItem.questionImg} onChange={(e)=>setCurrentItem(item=>({...item,questionImg:e.target.value}))} />
                    </label>
                    
                    {errors.qaAnswer && <span className="error">{errors.qaAnswer}</span>}
                    <label className="list-group-item">
                        Answer: 
                        <input value={currentItem.answer} onChange={(e)=>setCurrentItem(item=>({...item,answer:e.target.value}))} />
                    </label>
                    <label className="list-group-item">
                        Answer Img:
                        <input value={currentItem.answerImg} onChange={(e)=>setCurrentItem(item=>({...item,answerImg:e.target.value}))} />
                    </label>
                </div>
            }
            {currentItem.type ==='fill-in' && 
                <div>
                    {errors.fiQuestion && <span className="error">{errors.fiQuestion}<br /></span>}
                    {errors.fiQuestionReq && <span className="error">{errors.fiQuestionReq}</span>}
                    <label className="list-group-item">
                        Question: 
                        <input value={currentItem.question} onChange={(e)=>{setCurrentItem(item => ({...item,question:e.target.value}));
                    }} />
                    </label>
                    <label className="list-group-item">
                        Question Img:
                        <input value={currentItem.questionImg} onChange={(e)=>setCurrentItem(item=>({...item,questionImg:e.target.value}))} />
                    </label>
                    {errors.fiAnswer && <span className="error">{errors.fiAnswer}</span>}
                    <label className="list-group-item">
                        Answer: 
                    {parseQuestion()}
                    </label>
                    
                </div>
            }
            <label className="list-group-item">
                Chapter: 
                <input value={currentItem.chapter} onChange={(e)=>setCurrentItem(item=>({...item,chapter:e.target.value}))}/>
            </label>
            <label className="list-group-item">
                References: 
                <input value={currentItem.references} onChange={(e)=>setCurrentItem(item=>({...item,references:e.target.value}))}/>
            </label>
        
            
            
            <Link to="/" className="btn btn-secondary">Return</Link>
            
            <button type="submit" className="btn btn-primary" >
            Submit
            </button>
            
            
            
            
            
                        
        </form>
        </div>
        </div>
    )
}

export default EditQuestion;