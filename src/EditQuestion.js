import {useState} from 'react';
import './EditQuestion.css';
const EditQuestion = ({item, editQuestion}) => {
    const [currentItem, setCurrentItem] = useState(item);
    
    
    const parseQuestion = () =>{
        const re = /(\.\.\.)/gm;
        const answersNeeded = currentItem.question.match(re);
        let answers =[];
        
        if(answersNeeded != null)
        {
            for(let i = 0; i < answersNeeded.length; i++)
            {
                answers.push(<input value={currentItem.answer.split('|')[i]} key={i} onChange={(e)=>handleAnswerChange(e.target.value,i)} />)
                answers.push(<br />);
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

    const onSubmit =(event)=>{
        event.preventDefault();
        editQuestion(currentItem);
    }


    return (
        <form onSubmit={onSubmit}>
            <label>
                Id:
                <input value={currentItem.id} disabled/>
            </label> <br />
            <label>
                Question Type: -- 
                <select value={currentItem.type} onChange={(e)=>setCurrentItem(item => ({...item,type:e.target.value}))}>
                    <option value="Q/A">Q/A</option>
                    <option value="Fill-in">Fill-in</option>
                </select>
                 --
            </label> <br />
            <label>
                Category Type: --
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
                 --
            </label><br />
            {currentItem.type === 'Q/A' && 
                <div>            
                    <label>
                        Question: 
                        <input value={currentItem.question} onChange={(e)=>setCurrentItem(item=>({...item,question:e.target.value}))} />
                    </label><br />
                    <label>
                        Question Img: 
                        <input value={currentItem.questionImg} onChange={(e)=>setCurrentItem(item=>({...item,questionImg:e.target.value}))} />
                    </label><br />
                    <label>
                        Answer: 
                        <input value={currentItem.answer} onChange={(e)=>setCurrentItem(item=>({...item,answer:e.target.value}))} />
                    </label><br />
                    <label>
                        Answer Img:
                        <input value={currentItem.answerImg} onChange={(e)=>setCurrentItem(item=>({...item,answerImg:e.target.value}))} />
                    </label><br />
                </div>
            }
            {currentItem.type ==='Fill-in' && 
                <div>
                    <label>
                        Question: 
                        <input value={currentItem.question} onChange={(e)=>{setCurrentItem(item => ({...item,question:e.target.value}));
                    }} />
                    </label><br />
                    <label>
                        Answer: 
                    {parseQuestion()}
                    </label><br />
                    <label>
                        Question Img:
                        <input value={currentItem.questionImg} onChange={(e)=>setCurrentItem(item=>({...item,questionImg:e.target.value}))} />
                    </label><br />
                </div>
            }
            <label>
                Chapter: 
                <input value={currentItem.chapter} />
            </label><br />
            <label>
                References: 
                <input value={currentItem.references} />
            </label><br />

            
            
            <input type="submit" value="Submit" />
                        
        </form>
    )
}

export default EditQuestion;