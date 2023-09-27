import {Link} from 'react-router-dom';
const QuestionContainer = ({questionList, editQuestion, toggleActive,match}) => {

    const handleDisableClick = (item) => {
        toggleActive(item.id);
    }

    return (

        <div>
            
            <ul className="list-group list-group-flush ">

                {questionList.map(item=>{return(
                    <li className="list-group-item">
                        <div>{item.id}. {item.category} - {item.question}</div>
                        <Link to={`/edit/${item.id}`}>
                            <button type="button" className="btn btn-secondary" >Edit</button>
                        </Link>
                        
                        {item.active?
                             <button type="button" className="btn btn-danger" onClick={()=>{handleDisableClick(item)}}>Disable</button> 
                            :<button type="button" className="btn btn-success" onClick={()=>{handleDisableClick(item)}}>Enable</button>
                        } 
                    </li>)

                })}
            </ul>
        </div>
    )

}

export default QuestionContainer;